import type * as ts from 'typescript';
import { core } from '../core/core';

let reusableTypes: null | ts.SyntaxKind[] = null;

function getReusableTypes(): ts.SyntaxKind[] {
  return [
    core.ts.SyntaxKind.ClassDeclaration,
    core.ts.SyntaxKind.InterfaceDeclaration,
    core.ts.SyntaxKind.TypeAliasDeclaration,
  ];
}

export function isTypeReferenceReusable(declaration: ts.Declaration): boolean {
  reusableTypes = reusableTypes || getReusableTypes();

  return reusableTypes.includes(declaration.kind);
}
