import { GetType } from "../descriptor/type/type";
import * as ts from 'typescript';

const reusableTypes = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType
];

export function isTypeReusable(node: ts.Node): boolean {
    const nodeResolved = GetType(node);
    return reusableTypes.includes(nodeResolved.kind) && !hasTypeArguments(node);
}

function hasTypeArguments(node: ts.Node): boolean {
    return ts.isTypeReferenceNode(node) && !!node.typeArguments && node.typeArguments.length > 0;
}