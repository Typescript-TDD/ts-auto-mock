import * as ts from 'typescript';

export function createImportOnIdentifier(filenameToImportFrom: string, importIdentifier: ts.Identifier): ts.ImportDeclaration {
    return ts.createImportDeclaration(
        [],
        [],
        ts.createImportClause(
            undefined,
            ts.createNamespaceImport(importIdentifier), // this is to do `* as namespace_import_identifier`
        ),
        ts.createStringLiteral(filenameToImportFrom),
    );
}
