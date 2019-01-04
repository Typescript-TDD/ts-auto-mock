"use strict";
exports.__esModule = true;
var ts = require("typescript");
var path = require("path");
function transformer(program) {
    return function (context) { return function (file) { return visitNodeAndChildren(file, program, context); }; };
}
exports["default"] = transformer;
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
    return getDescriptor(node.typeArguments[0], typeChecker);
    // const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    // const properties = typeChecker.getPropertiesOfType(type);
    // return ts.createArrayLiteral(properties.map(property => ts.createLiteral(property.name)));
}
var indexTs = path.join(__dirname, 'index.ts');
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
        //&& (path.join(declaration.getSourceFile().fileName) === indexTs)
        && !!declaration['name']
        && (declaration['name'].getText() === 'keys');
}
function getDescriptor(type, typeChecker) {
    //this try to understand the type of the node
    switch (type.kind) {
        case ts.SyntaxKind.PropertySignature:
            return getDescriptor(type.type, typeChecker);
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.InterfaceDeclaration:
            return ts.createObjectLiteral(type.members.map(function (m) { return ts.createPropertyAssignment(m.name || '', getDescriptor(m, typeChecker)); }));
        case ts.SyntaxKind.TypeReference:
            var symbol = typeChecker.getSymbolAtLocation(type.typeName);
            var declaration = ((symbol && symbol.declarations) || [])[0];
            return getDescriptor(declaration, typeChecker);
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.StringKeyword:
            return ts.createLiteral('string');
        case ts.SyntaxKind.FunctionType: // the type is a function
            var myType = typeChecker.getTypeAtLocation(type);
            var signature = typeChecker.getReturnTypeOfSignature(myType.getCallSignatures()[0]); // get the object the contain the return type of the function
            if (signature.flags === ts.TypeFlags.Object) { // apparently in a lot of scenario is an object (when is a function, interface ecc)
                var subType = typeChecker.getTypeAtLocation(signature.symbol.declarations[0]);
                // we need to iterate again here with getDescriptor(signature.symbol.declarations[0])
                console.log(signature.symbol.declarations[0].kind);
                //console.log(signature.symbol.declarations[0]);
            }
            return ts.createLiteral("funct"); // we should create our object that describe funcions and names
        //return ts.createObjectLiteral(ts.createPropertyAssignment())
        case ts.SyntaxKind.ArrayType:
        default:
            return ts.createLiteral("Error" + ts.SyntaxKind[type.kind]);
    }
}
