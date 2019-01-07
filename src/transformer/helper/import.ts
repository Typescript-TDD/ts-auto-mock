import * as ts from 'typescript';
import * as urlslug from 'url-slug';

export interface ImportWithIdentifier {
	importDeclaration: ts.ImportDeclaration;
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