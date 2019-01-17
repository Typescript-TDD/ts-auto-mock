import { GetType } from "../descriptor/type/type";
import * as ts from 'typescript';

const reusableTypes = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
    ts.SyntaxKind.FunctionType
];

export function isTypeReusable(node: ts.Node) {
    const nodeResolved = GetType(node);
    return reusableTypes.includes(nodeResolved.kind);
}