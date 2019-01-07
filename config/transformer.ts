import * as ts from 'typescript';
import * as path from 'path';
import { createFactoryExport } from './helpers';
import { GetDescriptor } from "../src/transformer/descriptor/descriptor";
import { SetTypeChecker, GetTypeChecker } from "../src/transformer/getTypeChecker";

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    SetTypeChecker(program.getTypeChecker());
    return (context: ts.TransformationContext) => (file: ts.SourceFile) => visitNodeAndChildren(file, context);
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node {
    return ts.visitEachChild(visitNode(node), childNode => visitNodeAndChildren(childNode, context), context);
}

function visitNode(node: ts.Node,): ts.Node {
    if (!isKeysCallExpression(node)) {
        return node;
    }
    if (!node.typeArguments) {
        return ts.createArrayLiteral([]);
    }

    return GetDescriptor(node.typeArguments[0]);
}

const indexTs = path.join(__dirname, 'create-mock.ts');
function isKeysCallExpression(node: ts.Node): node is ts.CallExpression {
    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }
    const typeChecker = GetTypeChecker();
    const signature = typeChecker.getResolvedSignature(node as ts.CallExpression);
    if (typeof signature === 'undefined') {
        return false;
    }


    const { declaration } = signature;
    return !!declaration
        && (path.join(declaration.getSourceFile().fileName) === indexTs)
        && !!declaration['name']
        && (declaration['name'].getText() === 'createMock');
}