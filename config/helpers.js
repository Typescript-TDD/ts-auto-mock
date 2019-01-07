"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var urlslug = require("url-slug");
function createImport(filenameToImportFrom) {
    var importIdentifier = ts.createIdentifier(urlslug(filenameToImportFrom, '_'));
    return {
        importDeclaration: ts.createImportDeclaration([], [], ts.createImportClause(ts.createIdentifier('import_identifier'), // useless?
        ts.createNamespaceImport(importIdentifier) // this is to do `* as namespace_import_identifier`
        ), ts.createStringLiteral(filenameToImportFrom)),
        identifier: importIdentifier
    };
}
exports.createImport = createImport;
function createFactoryExport(factoryName, newMockInstanceExpression) {
    var identifier = ts.createIdentifier(factoryName);
    return {
        exportDeclaration: ts.createFunctionDeclaration([], [ts.createToken(ts.SyntaxKind.ExportKeyword)], undefined, identifier, undefined, [], undefined, ts.createBlock([ts.createReturn(newMockInstanceExpression)])),
        identifier: identifier
    };
}
exports.createFactoryExport = createFactoryExport;
