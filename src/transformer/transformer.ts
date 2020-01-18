import * as ts from 'typescript';
import { SetTsAutoMockOptions, TsAutoMockOptions } from '../options/options';
import { isCreateMock, isCreateMockList, isFromTsAutoMock, isRegisterMock } from './matcher/matcher';
import { getMock, getMockForList, storeRegisterMock } from './mock/mock';
import { MockDefiner } from './mockDefiner/mockDefiner';
import { SetTypeChecker, TypeChecker } from './typeChecker/typeChecker';

export default function transformer(program: ts.Program, options?: TsAutoMockOptions): ts.TransformerFactory<ts.SourceFile> {
  SetTsAutoMockOptions(options);
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

  MockDefiner.instance.setFileNameFromNode(nodeToMock);
  MockDefiner.instance.setTsAutoMockImportIdentifier();

  const declaration: ts.FunctionDeclaration = signature.declaration as ts.FunctionDeclaration;

  if (isCreateMock(declaration)) {
    return getMock(nodeToMock, node);
  }

  if (isCreateMockList(declaration)) {
    return getMockForList(nodeToMock, node);
  }

  if (isRegisterMock(declaration)) {
    return storeRegisterMock(nodeToMock, node);
  }

  return node;
}

function getSignature(node: ts.CallExpression): ts.Signature {
  const typeChecker: ts.TypeChecker = TypeChecker();

  return typeChecker.getResolvedSignature(node);
}
