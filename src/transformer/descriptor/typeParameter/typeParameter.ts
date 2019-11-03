import * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { MockGenericParameter } from '../../mockGeneric/mockGenericParameter';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration, scope: Scope): ts.Expression {
    const type: ts.TypeParameter = TypeChecker().getTypeAtLocation(node);

    const declr: ts.Declaration = type.symbol.declarations[0];
    const test: ts.Declaration = ts.getTypeParameterOwner(declr);


    const element: number = (test as ts.InterfaceDeclaration).typeParameters.findIndex((tp: ts.TypeParameterDeclaration) => {
        return tp.name === (declr as ts.TypeParameterDeclaration).name;
    });

    const descriptor: ts.Expression = node.default ? GetDescriptor(node.default, scope) : GetNullDescriptor();

    return ts.createConditional(
        ts.createBinary(
            MockGenericParameter,
            ts.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
            ts.createElementAccess(
                MockGenericParameter,
                ts.createNumericLiteral(element.toString())
            )
        ),
        ts.createToken(SyntaxKind.QuestionToken),
        ts.createCall(ts.createElementAccess(
            MockGenericParameter,
            ts.createNumericLiteral(element.toString())
        ), [], []),
        ts.createToken(SyntaxKind.ColonToken),
        descriptor
    )
}
