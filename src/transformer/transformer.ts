import * as path from 'path';
import * as ts from 'typescript';
import { GetDescriptor } from './descriptor/descriptor';
import { TypeReferenceCache } from './descriptor/typeReference/cache';
import { MockDefiner } from './mockDefiner/mockDefiner';
import { GetMockFactoryCall } from './mockFactoryCall/mockFactoryCall';
import { SetTypeChecker, TypeChecker } from './typeChecker/typeChecker';
import { isTypeReusable } from './typeValidator/typeValidator';

export default function transformer(program: ts.Program): ts.TransformerFactory<ts.SourceFile> {
    SetTypeChecker(program.getTypeChecker());

    return (context: ts.TransformationContext): (file: ts.SourceFile) => ts.SourceFile => (file: ts.SourceFile): ts.SourceFile => {
        MockDefiner.instance.initFile(file);
        let sourceFile: ts.SourceFile = visitNodeAndChildren(file, context);

        sourceFile = ts.updateSourceFileNode(sourceFile, [
            ...MockDefiner.instance.getTopStatementsForFile(sourceFile),
            ...sourceFile.statements,
        ]);

        return sourceFile;
    };
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node {
    return ts.visitEachChild(visitNode(node), (childNode: ts.Node) => visitNodeAndChildren(childNode, context), context);
}

function visitNode(node: ts.Node): ts.Node {
    if (!isCreateMockCallExpression(node)) {
        return node;
    }

    const nodeToMock: ts.TypeNode = node.typeArguments[0];
    TypeReferenceCache.instance.clear();
    MockDefiner.instance.setFileNameFromNode(nodeToMock);
    MockDefiner.instance.setTsAutoMockImportIdentifier();

    if (isTypeReusable(nodeToMock)) {
        return GetMockFactoryCall(nodeToMock);
    } else {
        return GetDescriptor(nodeToMock);
    }
}

function isCreateMockCallExpression(node: ts.Node): node is ts.CallExpression {
    const indexTs: string = path.join(__dirname, 'src/transformer/create-mock.ts');

    if (node.kind !== ts.SyntaxKind.CallExpression) {
        return false;
    }

    const typeChecker: ts.TypeChecker = TypeChecker();
    const signature: ts.Signature = typeChecker.getResolvedSignature(node as ts.CallExpression);
    if (typeof signature === 'undefined') {
        return false;
    }

    const { declaration }: ts.Signature = signature;
    return !!declaration
        && (path.join(declaration.getSourceFile().fileName) === indexTs)
        // tslint:disable-next-line:no-string-literal
        && !!declaration['name']
        // tslint:disable-next-line:no-string-literal
        && (declaration['name'].getText() === 'createMock');
}
