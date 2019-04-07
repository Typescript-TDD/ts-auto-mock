import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetTypes } from '../type/type';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetUnionDescriptor(node: ts.UnionTypeNode): ts.Expression {
    const findNodes: ts.Node[] = GetTypes(node.types);

    const notDefinedType: ts.Node[] = findNodes.filter((typeNode: ts.TypeNode) => {
        return isNotDefinedType(typeNode);
    });

    if (notDefinedType.length) {
        return GetUndefinedDescriptor();
    }

    return GetDescriptor(node.types[0]);
}

function isNotDefinedType(typeNode: ts.Node): boolean {
    return typeNode.kind === ts.SyntaxKind.VoidKeyword
        || typeNode.kind === ts.SyntaxKind.NullKeyword
        || typeNode.kind === ts.SyntaxKind.UnknownKeyword
        || typeNode.kind === ts.SyntaxKind.UndefinedKeyword;
}
