import * as ts from 'typescript';
import { GetType } from '../descriptor/type/type';
import { Scope } from '../scope/scope';

const reusableTypes: ts.SyntaxKind[] = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
];

export function isTypeReusable(node: ts.Node, scope: Scope): boolean {
    const nodeResolved: ts.Node = GetType(node, scope);
    return reusableTypes.includes(nodeResolved.kind);
}
