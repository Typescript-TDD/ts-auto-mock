import type * as ts from 'typescript';
import { core } from '../core/core';

export function isTypeReferenceReusable(declaration: ts.Declaration): boolean {
  return [
    core.ts.SyntaxKind.ClassDeclaration,
    core.ts.SyntaxKind.InterfaceDeclaration,
    core.ts.SyntaxKind.TypeAliasDeclaration,
  ].includes(declaration.kind);
}
