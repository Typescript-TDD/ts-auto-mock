import * as ts from 'typescript';

const reusableTypes: ts.SyntaxKind[] = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
    ts.SyntaxKind.TypeAliasDeclaration,
];

export function isTypeReferenceReusable(declaration: ts.Declaration): boolean {
    return reusableTypes.includes(declaration.kind);
}
