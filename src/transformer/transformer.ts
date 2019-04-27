import * as ts from 'typescript';
import { GetDescriptor } from './descriptor/descriptor';
import { TypeReferenceCache } from './descriptor/typeReference/cache';
import { isCreateMock, isCreateMockList, isFromTsAutoMock } from './matcher/matcher';
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
    if (!ts.isCallExpression(node)) {
        return node;
    }

    const signature: ts.Signature = getSignature(node);

    if (!isFromTsAutoMock(signature)) {
        return node;
    }

    const nodeToMock: ts.TypeNode = node.typeArguments[0];

    TypeReferenceCache.instance.clear();
    MockDefiner.instance.setFileNameFromNode(nodeToMock);
    MockDefiner.instance.setTsAutoMockImportIdentifier();

    const declaration: ts.FunctionDeclaration = signature.declaration as ts.FunctionDeclaration;

    if (isCreateMock(declaration)) {
        return getMockExpression(nodeToMock);
    }

    if (isCreateMockList(declaration)) {
        const lengthLiteral: ts.NumericLiteral = node.arguments[0] as ts.NumericLiteral;
        const mocks: ts.Expression[] = getListOfMockExpression(nodeToMock, lengthLiteral);

        return ts.createArrayLiteral(mocks);
    }

    return node;
}

function getListOfMockExpression(nodeToMock: ts.TypeNode, lengthLiteral: ts.NumericLiteral): ts.Expression[] {
    const length: number = lengthLiteral ? parseInt(lengthLiteral.text, 10) : 0;
    const mocks: ts.Expression[] = [];
    const mock: ts.Expression = getMockExpression(nodeToMock);

    for (let i: number = 0; i <= length - 1; i++) {
        mocks.push(mock);
    }

    return mocks;
}

function getMockExpression(nodeToMock: ts.TypeNode): ts.Expression {
    if (isTypeReusable(nodeToMock)) {
        return GetMockFactoryCall(nodeToMock);
    }

    return GetDescriptor(nodeToMock);
}

function getSignature(node: ts.CallExpression): ts.Signature {
    const typeChecker: ts.TypeChecker = TypeChecker();

    return typeChecker.getResolvedSignature(node);
}
