"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
var helpers_1 = require("./helpers");
var descriptor_1 = require("../src/transformer/descriptor/descriptor");
var cache = new Map();
var exportList = new Map();
var exportMap = new Map();
var importList = new Map();
function transformer(program) {
    return function (context) { return function (file) {
        var sourceFile = visitNodeAndChildren(file, program, context);
        var importsToAdd = importList.get(sourceFile.fileName);
        var exportsToAdd = exportList.get(sourceFile.fileName);
        // console.log('File:', sourceFile.fileName);
        // console.log('Imports', (importsToAdd||[]).map(x => x.getText()));
        // console.log('Exports', (exportsToAdd||[]).map(x => x.identifier.text));
        sourceFile = ts.updateSourceFileNode(sourceFile, (importsToAdd || []).concat((exportsToAdd || []).map(function (x) { return x.exportDeclaration; }), sourceFile.statements));
        return sourceFile;
    }; };
}
exports.default = transformer;
function visitNodeAndChildren(node, program, context) {
    return ts.visitEachChild(visitNode(node, program), function (childNode) { return visitNodeAndChildren(childNode, program, context); }, context);
}
function visitNode(node, program) {
    var typeChecker = program.getTypeChecker();
    if (!isKeysCallExpression(node, typeChecker)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }
    return ts.createCall(generateFactoryIfNeeded(node.typeArguments[0], typeChecker), [], []);
}
function generateFactoryIfNeeded(type, typeChecker) {
    var symbol = typeChecker.getSymbolAtLocation(type.typeName);
    var declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
    var declaration = declaredType.symbol.declarations[0];
    var thisFileName = type.getSourceFile().fileName;
    var key = declaration;
    if (!cache.has(key)) {
        var baseFactoryName = "create__" + typeChecker.typeToString(typeChecker.getTypeFromTypeNode(type)) + "__mock"; // generateFactoryName(type);
        var count = exportMap.has(thisFileName) && exportMap.get(thisFileName).get(baseFactoryName) || 1;
        var factoryName = baseFactoryName + count;
        console.log('Declaration EXPORT', factoryName);
        var newFactory = helpers_1.createFactoryExport(factoryName, descriptor_1.GetDescriptor(type, typeChecker));
        if (exportList.has(thisFileName)) {
            exportMap.get(thisFileName).set(baseFactoryName, count + 1);
            exportList.get(thisFileName).push(newFactory);
        }
        else {
            var thisFileExports = new Map();
            thisFileExports.set(baseFactoryName, count + 1);
            exportMap.set(thisFileName, thisFileExports);
            exportList.set(thisFileName, [newFactory]);
        }
        cache.set(key, { name: factoryName, filepath: type.getSourceFile().fileName });
        return newFactory.identifier;
    }
    else {
        console.log('Declaration IMPORT', key);
        var factoryImport = helpers_1.createImport(cache.get(key).filepath);
        if (importList.has(thisFileName)) {
            importList.get(thisFileName).push(factoryImport.importDeclaration);
        }
        else {
            importList.set(thisFileName, [factoryImport.importDeclaration]);
        }
        return ts.createPropertyAccess(factoryImport.identifier, cache.get(key).name);
    }
}
var indexTs = path.join(__dirname, 'create-mock.ts');
function isKeysCallExpression(node, typeChecker) {
    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
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
