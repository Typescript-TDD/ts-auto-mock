import * as ts from 'typescript';
import { SetTsAutoMockOptions, TsAutoMockOptions } from '../../options/options';
import { SetTypeChecker } from '../typeChecker/typeChecker';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { SetProgram } from '../program/program';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { CustomFunction, getMatchingCustomFunction } from '../matcher/matcher';
import { GetIsFilesExcludedFromOptions } from '../../options/files';
import { updateSourceFileNode } from '../../typescriptFactory/typescriptFactory';

export function baseTransformer(
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
        customFunctions
      );

      sourceFile = updateSourceFileNode(sourceFile, [
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
  customFunctions: CustomFunction[]
): ts.SourceFile;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  customFunctions: CustomFunction[]
): ts.Node;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  customFunctions: CustomFunction[]
): ts.Node {
  return ts.visitEachChild(
    visitNode(node, customFunctions),
    (childNode: ts.Node) =>
      visitNodeAndChildren(childNode, context, customFunctions),
    context
  );
}

function visitNode(node: ts.Node, customFunctions: CustomFunction[]): ts.Node {
  if (!ts.isCallExpression(node)) {
    return node;
  }

  const signature:
    | ts.Signature
    | undefined = TypescriptHelper.getSignatureOfCallExpression(node);

  if (!signature || !signature.declaration) {
    return node;
  }

  const matchingCustomFunction: CustomFunction | void = getMatchingCustomFunction(
    node,
    signature.declaration,
    customFunctions
  );

  if (!matchingCustomFunction) {
    return node;
  }

  MockDefiner.instance.setFileNameFromNode(node);
  MockDefiner.instance.setTsAutoMockImportIdentifier();

  return matchingCustomFunction.run(node);
}
