import * as path from 'path';
import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';

export interface CustomFunction {
  sourceUrl: string;
  sourceDts: string;
}

export function isFunctionFromThisLibrary(declaration: ts.Declaration, customFunctions: CustomFunction[]): boolean {
  if (!ts.isFunctionDeclaration(declaration)) {
    return false;
  }

  const fileName: string = declaration.getSourceFile().fileName;

  return customFunctions.some((customFunction: CustomFunction) => {
    const functionUrl: string = path.join(__dirname, customFunction.sourceUrl);
    const isFileNameFunctionUrl: boolean = path.relative(fileName, functionUrl) === '';
    if (fileName.includes(customFunction.sourceDts) && !isFileNameFunctionUrl) {
      TransformerLogger().unexpectedCreateMock(fileName, functionUrl);
    }

    return isFileNameFunctionUrl;
  });
}
