import * as ts from 'typescript';
import * as path from 'path';
import { createFactoryExport } from './helpers';

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, program, context);
}

function visitNodeAndChildren(node: ts.SourceFile, program: ts.Program, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, program: ts.Program, context: ts.TransformationContext): ts.Node {
    return ts.visitEachChild(visitNode(node, program), childNode => visitNodeAndChildren(childNode, program, context), context);
}

function visitNode(node: ts.Node, program: ts.Program): ts.Node {
    const typeChecker = program.getTypeChecker();
    if (!isKeysCallExpression(node, typeChecker)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }

    console.log(createFactoryExport);

    return getDescriptor(node.typeArguments[0], typeChecker);
    // const type = typeChecker.getTypeFromTypeNode(node.typeArguments[0]);
    // const properties = typeChecker.getPropertiesOfType(type);
    // return ts.createArrayLiteral(properties.map(property => ts.createLiteral(property.name)));
}

const indexTs = path.join(__dirname, 'index.ts');
function isKeysCallExpression(node: ts.Node, typeChecker: ts.TypeChecker): node is ts.CallExpression {
    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    const signature = typeChecker.getResolvedSignature(node as ts.CallExpression);
    if (typeof signature === 'undefined') {
        return false;
    }


    const { declaration } = signature;
    return !!declaration
        //&& (path.join(declaration.getSourceFile().fileName) === indexTs)
        && !!declaration['name']
        && (declaration['name'].getText() === 'keys');
}


function getDescriptor(type: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
    //this try to understand the type of the node
    switch (type.kind) {
        case ts.SyntaxKind.PropertySignature:
            return getDescriptor((type as ts.PropertySignature).type, typeChecker);
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.InterfaceDeclaration:
            return ts.createObjectLiteral(
                (type as ts.InterfaceDeclaration).members.map(
                    (m): ts.ObjectLiteralElementLike => ts.createPropertyAssignment(m.name || '', getDescriptor(m, typeChecker)),
                ),
            );
        case ts.SyntaxKind.TypeReference:
            const symbol = typeChecker.getSymbolAtLocation((type as ts.TypeReferenceNode).typeName);
            const declaration = ((symbol && symbol.declarations) || [])[0];
            return getDescriptor(declaration, typeChecker);
        case ts.SyntaxKind.NumberKeyword:
        case ts.SyntaxKind.BooleanKeyword:
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.StringKeyword:
            return ts.createLiteral('string');
        case ts.SyntaxKind.FunctionType: // the type is a function
            const myType = typeChecker.getTypeAtLocation(type);
            const signature = typeChecker.getReturnTypeOfSignature(myType.getCallSignatures()[0]); // get the object the contain the return type of the function
            if (signature.flags === ts.TypeFlags.Object) { // apparently in a lot of scenario is an object (when is a function, interface ecc)
                const subType = typeChecker.getTypeAtLocation(signature.symbol.declarations[0]);
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