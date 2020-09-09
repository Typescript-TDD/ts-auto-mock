import ts from 'typescript';
import { Logger } from '../../logger/logger';
import { ILogger } from '../../logger/logger.interface';
import { GetCurrentCreateMock } from '../mock/currentCreateMockNode';

let logger: ILogger;

export interface TransformerLogger {
  circularGenericNotSupported(nodeName: string): void;

  unexpectedCreateMock(mockFileName: string, expectedFileName: string): void;

  typeNotSupported(type: string, currentNode?: ts.Node): void;

  typeOfFunctionCallNotFound(node: string): void;

  indexedAccessTypeFailed(propertyName: string, nodeText: string): void;
}

const notSupportedTypeMessage: (
  type: string,
  createMockFileUrl: string,
  currentNodeFileUrl: string
) => string = (
  type: string,
  createMockFileUrl: string,
  currentNodeFileUrl: string
) => `Not supported type: ${type} - it will convert to null
created ${createMockFileUrl}
used by ${currentNodeFileUrl}`;

export const getNodeFileUrl: (node: ts.Node) => string = (node: ts.Node) => {
  const sourceFile: ts.SourceFile = node.getSourceFile();
  const {
    line,
    character,
  }: ts.LineAndCharacter = sourceFile.getLineAndCharacterOfPosition(
    node.getStart()
  );

  return `file://${sourceFile.fileName}:${line + 1}:${character + 1}`;
};

export function TransformerLogger(): TransformerLogger {
  logger = logger || Logger('Transformer');

  return {
    circularGenericNotSupported(nodeName: string): void {
      logger.warning(
        `Found a circular generic of \`${nodeName}' and such generics are currently not supported. 
        The generated mock will be incomplete.`
      );
    },
    unexpectedCreateMock(mockFileName: string, expectedFileName: string): void {
      logger.warning(`I\'ve found a mock creator but it comes from a different folder
            found: ${mockFileName}
            expected: ${expectedFileName}`);
    },
    typeNotSupported(type: string, currentNode: ts.Node): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(currentNode);

      logger.warning(
        notSupportedTypeMessage(type, createMockFileUrl, currentNodeFileUrl)
      );
    },
    typeOfFunctionCallNotFound(node: string): void {
      logger.warning(
        `Cannot find type of function call: ${node} - it will convert to null`
      );
    },
    indexedAccessTypeFailed(propertyName: string, nodeText: string): void {
      logger.warning(
        `IndexedAccessType transformation failed: cannot find property ${propertyName} of - ${nodeText}`
      );
    },
  };
}
