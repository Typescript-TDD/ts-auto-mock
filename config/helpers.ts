import * as ts from 'typescript';
import * as urlslug from 'url-slug';

export interface ImportWithIdentifier {
	importDeclaration: ts.ImportDeclaration;
	identifier: ts.Identifier;
}

export interface ExportWithIdentifier {
  exportDeclaration: ts.FunctionDeclaration;
  identifier: ts.Identifier;
}

export function createImport(filenameToImportFrom: string): ImportWithIdentifier {
	const importIdentifier = ts.createIdentifier(urlslug(filenameToImportFrom, '_'));

	return {
		importDeclaration: ts.createImportDeclaration(
			[],
			[],
			ts.createImportClause(
				ts.createIdentifier('import_identifier'), // useless?
				ts.createNamespaceImport(importIdentifier) // this is to do `* as namespace_import_identifier`
			),
			ts.createStringLiteral(filenameToImportFrom)
		),
		identifier: importIdentifier
	};
}

export function createFactoryExport(
	factoryName: string,
	newMockInstanceExpression: ts.Expression
): ExportWithIdentifier {
  const identifier = ts.createIdentifier(factoryName);

	return {
    exportDeclaration: ts.createFunctionDeclaration(
      [],
      [ ts.createToken(ts.SyntaxKind.ExportKeyword) ],
      undefined,
      identifier,
      undefined,
      [],
      undefined,
      ts.createBlock([ ts.createReturn(newMockInstanceExpression) ])
    ),
    identifier: identifier
  };
}
