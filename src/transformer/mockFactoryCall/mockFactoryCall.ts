import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { TypescriptCreator } from '../helper/creator';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockGenericParameter } from '../mockGeneric/mockGenericParameter';
import { Scope } from '../scope/scope';

export function GetMockFactoryCall(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const genericsFunctions: ts.FunctionExpression[] = [];

    if (node.typeArguments) {
        node.typeArguments.forEach((argument: ts.TypeNode) => {
            let genericDescriptor: ts.Expression;

            genericDescriptor = GetDescriptor(argument, scope);

            const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(ts.createBlock(
                [ts.createReturn(genericDescriptor)],
            ));

            genericsFunctions.push(genericFunction);
        });
    }

    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(declaration);

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(genericsFunctions)],
    );
}

export function GetMockFactoryCallForThis(declaration: ts.Declaration): ts.Expression {
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(declaration);

    return ts.createCall(
        mockFactoryCall,
        [],
        [MockGenericParameter],
    );
}
