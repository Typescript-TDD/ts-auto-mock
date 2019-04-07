import * as ts from 'typescript';
import { GetType } from '../descriptor/type/type';

const reusableTypes: ts.SyntaxKind[] = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
];

export function isTypeReusable(node: ts.Node): boolean {
    const nodeResolved: ts.Node = GetType(node);
    return reusableTypes.includes(nodeResolved.kind) && !hasTypeArguments(node);
}

function hasTypeArguments(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) && !!node.typeArguments && node.typeArguments.length > 0;
}
