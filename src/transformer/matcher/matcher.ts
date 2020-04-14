import * as path from 'path';
import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';

export interface CustomFunction {
  sourceUrl: string;
  sourceDts: string;
}

export function isFunctionFromThisLibrary(signature: ts.Signature, customFunctions: CustomFunction[]): boolean {
  if (!isDeclarationDefined(signature)) {
    return false;
  }

  if (!signature.declaration || !ts.isFunctionDeclaration(signature.declaration)) {
    return false;
  }

  const fileName: string = signature.declaration.getSourceFile().fileName;

  return customFunctions.some((customFunction: CustomFunction) => {
    const functionUrl: string = path.join(__dirname, customFunction.sourceUrl);
    const isFileNameFunctionUrl: boolean = path.relative(fileName, functionUrl) === '';
    if (fileName.includes(customFunction.sourceDts) && !isFileNameFunctionUrl) {
      TransformerLogger().unexpectedCreateMock(fileName, functionUrl);
    }

    return isFileNameFunctionUrl;
  });
}

function isDeclarationDefined(signature: ts.Signature): boolean {
  return signature && !!signature.declaration;
}
