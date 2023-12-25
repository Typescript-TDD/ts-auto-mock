import type * as ts from 'typescript';
import { SetTsAutoMockOptions, TsAutoMockOptions } from '../../options/options';
import { InitIdentifiers } from '../mockIdentifier/mockIdentifier';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { CustomFunction, getMatchingCustomFunction } from '../matcher/matcher';
import { GetIsFilesExcludedFromOptions } from '../../options/files';
import { updateSourceFileNode } from '../../typescriptFactory/typescriptFactory';
import { InitCore, core } from '../core/core';

export function baseTransformer(
  customFunctions: CustomFunction[],
  typescript: typeof ts,
): (
  program: ts.Program,
  options?: Partial<TsAutoMockOptions>,
) => ts.TransformerFactory<ts.SourceFile> {
  return (
    program: ts.Program,
    options?: Partial<TsAutoMockOptions>,
  ): ts.TransformerFactory<ts.SourceFile> => {
    if (options) {
      SetTsAutoMockOptions(options);
    }

    InitCore(typescript, program);
    InitIdentifiers();

    const isFileExcluded: (_sf: ts.SourceFile) => boolean =
      GetIsFilesExcludedFromOptions();

    return (
        context: ts.TransformationContext,
      ): ((file: ts.SourceFile) => ts.SourceFile) =>
      (file: ts.SourceFile): ts.SourceFile => {
        if (isFileExcluded(file)) {
          return file;
        }

        MockDefiner.instance.initFile(file);
        let sourceFile: ts.SourceFile = visitNodeAndChildren(
          file,
          context,
          customFunctions,
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
  customFunctions: CustomFunction[],
): ts.SourceFile;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  customFunctions: CustomFunction[],
): ts.Node;
function visitNodeAndChildren(
  node: ts.Node,
  context: ts.TransformationContext,
  customFunctions: CustomFunction[],
): ts.Node {
  return core.ts.visitEachChild(
    visitNode(node, customFunctions),
    (childNode: ts.Node) =>
      visitNodeAndChildren(childNode, context, customFunctions),
    context,
  );
}

function visitNode(node: ts.Node, customFunctions: CustomFunction[]): ts.Node {
  if (!core.ts.isCallExpression(node)) {
    return node;
  }

  const signature: ts.Signature | undefined =
    TypescriptHelper.getSignatureOfCallExpression(node);

  if (!signature || !signature.declaration) {
    return node;
  }

  const matchingCustomFunction: CustomFunction | void =
    getMatchingCustomFunction(node, signature.declaration, customFunctions);

  if (!matchingCustomFunction) {
    return node;
  }

  MockDefiner.instance.setFileNameFromNode(node);
  MockDefiner.instance.setTsAutoMockImportIdentifier();

  return matchingCustomFunction.run(node);
}
