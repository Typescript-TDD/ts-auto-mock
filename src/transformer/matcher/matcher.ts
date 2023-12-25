import * as path from 'path';
import type * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';
import { core } from '../core/core';

export interface CustomFunction {
  sourceUrl: string;
  sourceDts: string;

  isHandledFunction(
    node: ts.CallExpression,
    declaration: ts.SignatureDeclaration,
  ): boolean;
  run(node: ts.CallExpression): ts.Node;
}

function isHandledDeclarationType(
  declaration: ts.Declaration,
): declaration is ts.FunctionDeclaration | ts.MethodSignature {
  return (
    declaration &&
    (core.ts.isFunctionDeclaration(declaration) ||
      core.ts.isMethodSignature(declaration))
  );
}

export function getMatchingCustomFunction(
  node: ts.CallExpression,
  declaration: ts.Declaration,
  customFunctions: CustomFunction[],
): CustomFunction | void {
  if (!isHandledDeclarationType(declaration)) {
    return;
  }

  const fileName: string = declaration.getSourceFile().fileName;

  return customFunctions.find((customFunction: CustomFunction) => {
    const functionUrl: string = path.join(__dirname, customFunction.sourceUrl);
    const isFileNameFunctionUrl: boolean =
      path.relative(fileName, functionUrl) === '';
    if (fileName.includes(customFunction.sourceDts) && !isFileNameFunctionUrl) {
      TransformerLogger().unexpectedCreateMock(fileName, functionUrl);
    }

    return (
      isFileNameFunctionUrl &&
      customFunction.isHandledFunction(node, declaration)
    );
  });
}
