import * as ts from 'typescript';
import { SetTsAutoMockOptions, TsAutoMockOptions } from '../../options/options';
import { SetTypeChecker } from '../typeChecker/typeChecker';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { SetProgram } from '../program/program';
import { TypescriptHelper } from '../descriptor/helper/helper';
import {
  CustomFunction,
  isFunctionFromThisLibrary,
} from '../matcher/matcher';

export type Visitor = (node: ts.CallExpression, declaration: ts.FunctionDeclaration) => ts.Node;

export function baseTransformer(visitor: Visitor, customFunctions: CustomFunction[]): (program: ts.Program, options?: TsAutoMockOptions) => ts.TransformerFactory<ts.SourceFile> {
  return (program: ts.Program, options?: TsAutoMockOptions): ts.TransformerFactory<ts.SourceFile> => {
    SetTsAutoMockOptions(options);
    SetTypeChecker(program.getTypeChecker());
    SetProgram(program);

    return (context: ts.TransformationContext): (file: ts.SourceFile) => ts.SourceFile => (file: ts.SourceFile): ts.SourceFile => {
      MockDefiner.instance.initFile(file);
      let sourceFile: ts.SourceFile = visitNodeAndChildren(file, context, visitor, customFunctions);

      sourceFile = ts.updateSourceFileNode(sourceFile, [
        ...MockDefiner.instance.getTopStatementsForFile(sourceFile),
        ...sourceFile.statements,
      ]);

      return sourceFile;
    };
  };
}

function visitNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext, visitor: Visitor, customFunctions: CustomFunction[]): ts.SourceFile;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext, visitor: Visitor, customFunctions: CustomFunction[]): ts.Node;
function visitNodeAndChildren(node: ts.Node, context: ts.TransformationContext, visitor: Visitor, customFunctions: CustomFunction[]): ts.Node {
  return ts.visitEachChild(visitNode(node, visitor, customFunctions), (childNode: ts.Node) => visitNodeAndChildren(childNode, context, visitor, customFunctions), context);
}

function visitNode(node: ts.Node, visitor: Visitor, customFunctions: CustomFunction[]): ts.Node {
  if (!ts.isCallExpression(node)) {
    return node;
  }

  const signature: ts.Signature | undefined = TypescriptHelper.getSignatureOfCallExpression(node);

  if (!signature || !isFunctionFromThisLibrary(signature, customFunctions)) {
    return node;
  }

  const nodeToMock: ts.TypeNode | undefined = node.typeArguments?.[0];

  if (!nodeToMock) {
    throw new Error('Unhandled');
  }

  MockDefiner.instance.setFileNameFromNode(nodeToMock);
  MockDefiner.instance.setTsAutoMockImportIdentifier();

  const declaration: ts.FunctionDeclaration = signature.declaration as ts.FunctionDeclaration;

  return visitor(node, declaration);
}
