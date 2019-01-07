"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
function createImport(filenameToImportFrom) {
    var importIdentifier = ts.createIdentifier('namespace_import_identifier');
    return {
        importDeclaration: ts.createImportDeclaration([], [], ts.createImportClause(ts.createIdentifier('import_identifier'), // useless?
        ts.createNamespaceImport(importIdentifier) // this is to do `* as namespace_import_identifier`
        ), ts.createStringLiteral(filenameToImportFrom)),
        namespace: importIdentifier
    };
}
exports.createImport = createImport;
function createFactoryExport(factoryName, newMockInstanceExpression) {
    return ts.createFunctionDeclaration([], [ts.createToken(ts.SyntaxKind.ExportKeyword)], undefined, ts.createIdentifier(factoryName), undefined, [], undefined, ts.createBlock([ts.createReturn(newMockInstanceExpression)]));
}
exports.createFactoryExport = createFactoryExport;
