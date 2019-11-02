import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';

export function GetLiteralDescriptor(node: ts.LiteralTypeNode, scope: IScope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);
    const literalType: ts.LiteralType = type as ts.LiteralType;

    if (literalType.value) {
        return ts.createLiteral(literalType.value);
    } else {
        if (!node.literal) {
            return GetLiteralTokenDescriptor(node);
        }
        return GetDescriptor(node.literal, scope);
    }

}

function GetLiteralTokenDescriptor(node: ts.LiteralTypeNode): ts.StringLiteral | ts.NumericLiteral {
    // tslint:disable-next-line:no-any
    const nodeToken: any = node as any;

    if (nodeToken.kind === ts.SyntaxKind.NumericLiteral) {
        return ts.createLiteral(parseInt(nodeToken.text, 10));
    }

    return ts.createLiteral(nodeToken.text);
}
