import * as ts from 'typescript';

export interface ImportWithIdentifier {
  importDeclaration: ts.ImportDeclaration;
  namespace: ts.Identifier;
}

export function createImport(filenameToImportFrom: string): ImportWithIdentifier {
  const importIdentifier = ts.createIdentifier('namespace_import_identifier');

  return {
      importDeclaration: ts.createImportDeclaration([], [],
          ts.createImportClause(
              ts.createIdentifier('import_identifier'), // useless?
              ts.createNamespaceImport(importIdentifier) // this is to do `* as namespace_import_identifier`
          ),
          ts.createStringLiteral(filenameToImportFrom)
      ),
      namespace: importIdentifier
  }
}

export function createFactoryExport(factoryName: string, newMockInstanceExpression: ts.Expression): ts.FunctionDeclaration {
  return ts.createFunctionDeclaration(
      [],
      [ts.createToken(ts.SyntaxKind.ExportKeyword)],
      undefined,
      ts.createIdentifier(factoryName),
      undefined,
      [],
      undefined,
      ts.createBlock([ts.createReturn(newMockInstanceExpression)])
  );
}