"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
var getTypeChecker_1 = require("../src/transformer/getTypeChecker");
var mockDefiner_1 = require("../src/transformer/mockDefiner/mockDefiner");
function transformer(program) {
    getTypeChecker_1.SetTypeChecker(program.getTypeChecker());
    return function (context) { return function (file) {
        var sourceFile = visitNodeAndChildren(file, context);
        sourceFile = ts.updateSourceFileNode(sourceFile, mockDefiner_1.MockDefiner.instance.getExportsToAddInFile(sourceFile).concat(sourceFile.statements));
        return sourceFile;
    }; };
}
exports.transformer = transformer;
function visitNodeAndChildren(node, context) {
    return ts.visitEachChild(visitNode(node), function (childNode) { return visitNodeAndChildren(childNode, context); }, context);
}
function visitNode(node) {
    if (!isKeysCallExpression(node)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }
    return ts.createCall(mockDefiner_1.MockDefiner.instance.generateFactoryIfNeeded(node.typeArguments[0]), [], []);
}
var indexTs = path.join(__dirname, 'create-mock.ts');
function isKeysCallExpression(node) {
    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    var typeChecker = getTypeChecker_1.GetTypeChecker();
    var signature = typeChecker.getResolvedSignature(node);
    if (typeof signature === 'undefined') {
        return false;
    }
    var declaration = signature.declaration;
    return !!declaration
        && (path.join(declaration.getSourceFile().fileName) === indexTs)
        && !!declaration['name']
        && (declaration['name'].getText() === 'createMock');
}
