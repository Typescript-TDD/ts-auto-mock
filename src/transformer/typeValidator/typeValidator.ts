import { GetType } from "../descriptor/type/type";
import * as ts from 'typescript';

const validTypes = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
    ts.SyntaxKind.FunctionType
];

export function IsValidTypeToMock(node: ts.Node) {
    const nodeResolved = GetType(node);
    return validTypes.includes(nodeResolved.kind);
}