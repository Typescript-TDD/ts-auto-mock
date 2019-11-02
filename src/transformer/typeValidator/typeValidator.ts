import * as ts from 'typescript';
import { GetType } from '../descriptor/type/type';
import { IScope } from '../scope/scope.interface';

const reusableTypes: ts.SyntaxKind[] = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
];

export function isTypeReusable(node: ts.Node, scope: IScope): boolean {
    const nodeResolved: ts.Node = GetType(node, scope);
    return reusableTypes.includes(nodeResolved.kind) && !hasTypeArguments(node);
}

function hasTypeArguments(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) && !!node.typeArguments && node.typeArguments.length > 0;
}
