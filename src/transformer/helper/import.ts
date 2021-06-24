import type * as ts from 'typescript';
import { createImportAllAs } from '../../typescriptFactory/typescriptFactory';

export function createImportOnIdentifier(
  filenameToImportFrom: string,
  importIdentifier: ts.Identifier
): ts.ImportDeclaration {
  return createImportAllAs(importIdentifier, filenameToImportFrom);
}
