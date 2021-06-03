import * as path from 'path';
import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';

export interface CustomFunction {
  sourceUrl: string;
  sourceDts: string;

  isHandledFunction(
    node: ts.CallExpression,
    declaration: ts.SignatureDeclaration
  ): boolean;
  run(node: ts.CallExpression): ts.Node;
}

function isHandledDeclarationType(
  declaration: ts.Declaration
): declaration is ts.FunctionDeclaration | ts.MethodSignature {
  return (
    declaration &&
    (ts.isFunctionDeclaration(declaration) || ts.isMethodSignature(declaration))
  );
}

export function getMatchingCustomFunction(
  node: ts.CallExpression,
  declaration: ts.Declaration,
  customFunctions: CustomFunction[]
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
