import * as ts from 'typescript';
import { SetTsAutoMockOptions, TsAutoMockOptions } from '../../options/options';
import { SetTypeChecker } from '../typeChecker/typeChecker';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { SetProgram } from '../program/program';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { CustomFunction, isFunctionFromThisLibrary } from '../matcher/matcher';
import { GetIsFilesExcludedFromOptions } from '../../options/files';

export type Visitor = (
  node: ts.CallExpression & { typeArguments: ts.NodeArray<ts.TypeNode> },
  declaration: ts.FunctionDeclaration
) => ts.Node;

export function baseTransformer(
  visitor: Visitor,
  customFunctions: CustomFunction[]
): (
  program: ts.Program,
  options?: TsAutoMockOptions
) => ts.TransformerFactory<ts.SourceFile> {
  return (
    program: ts.Program,
    options?: TsAutoMockOptions
  ): ts.TransformerFactory<ts.SourceFile> => {
    if (options) {
      SetTsAutoMockOptions(options);
    }

    SetTypeChecker(program.getTypeChecker());
    SetProgram(program);

    const isFileExcluded: (
      _sf: ts.SourceFile
    ) => boolean = GetIsFilesExcludedFromOptions();

    return (
      context: ts.TransformationContext
    ): ((file: ts.SourceFile) => ts.SourceFile) => (
      file: ts.SourceFile
    ): ts.SourceFile => {
      if (isFileExcluded(file)) {
        return file;
      }

      MockDefiner.instance.initFile(file);
      let sourceFile: ts.SourceFile = visitNodeAndChildren(
        file,
        context,
        visitor,
        customFunctions
      );

      sourceFile = ts.updateSourceFileNode(sourceFile, [
        ...MockDefiner.instance.getTopStatementsForFile(sourceFile),
        ...sourceFile.statements,
      ]);

      return sourceFile;
    };
  };
}

function visitNodeAndChildren(
  node: ts.SourceFile,
  context: ts.TransformationContext,
  visitor: Visitor,
  customFunctions: CustomFunction[]
): ts.SourceFile;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  visitor: Visitor,
  customFunctions: CustomFunction[]
): ts.Node;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  visitor: Visitor,
  customFunctions: CustomFunction[]
): ts.Node {
  return ts.visitEachChild(
    visitNode(node, visitor, customFunctions),
    (childNode: ts.Node) =>
      visitNodeAndChildren(childNode, context, visitor, customFunctions),
    context
  );
}

function isObjectWithProperty<T extends {}, K extends keyof T>(
  obj: T,
  key: K
): obj is T & Required<{ [key in K]: T[K] }> {
  return typeof obj[key] !== 'undefined';
}

function visitNode(
  node: ts.Node,
  visitor: Visitor,
  customFunctions: CustomFunction[]
): ts.Node {
  if (!ts.isCallExpression(node)) {
    return node;
  }

  const signature:
    | ts.Signature
    | undefined = TypescriptHelper.getSignatureOfCallExpression(node);

  if (!signature || !isFunctionFromThisLibrary(signature, customFunctions)) {
    return node;
  }

  if (
    !isObjectWithProperty(node, 'typeArguments') ||
    !node.typeArguments?.length
  ) {
    const mockFunction: string = node.getText();

    throw new Error(
      `It seems you've called \`${mockFunction}' without specifying a type argument to mock. 
      Please refer to the documentation on how to use \`${mockFunction}': 
      https://github.com/Typescript-TDD/ts-auto-mock#quick-overview`
    );
  }

  const [nodeToMock]: ts.NodeArray<ts.TypeNode> = node.typeArguments;

  MockDefiner.instance.setFileNameFromNode(nodeToMock);
  MockDefiner.instance.prepareModuleImports();

  const declaration: ts.FunctionDeclaration = signature.declaration as ts.FunctionDeclaration;

  return visitor(node, declaration);
}
