import * as ts from 'typescript';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { IsTypescriptType } from '../descriptor/tsLibs/typecriptLibs';

const reusableTypes: ts.SyntaxKind[] = [
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.TypeLiteral,
    ts.SyntaxKind.MappedType,
    ts.SyntaxKind.TypeAliasDeclaration,
];

export function isTypeReferenceReusable(node: ts.TypeReferenceNode): boolean {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    return reusableTypes.includes(declaration.kind) && !IsTypescriptType(declaration);
}
