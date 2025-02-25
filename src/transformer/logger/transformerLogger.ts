import type ts from 'typescript';
import { Logger } from '../../logger/logger';
import { ILogger } from '../../logger/logger.interface';
import { GetCurrentCreateMock } from '../mock/currentCreateMockNode';

let logger: ILogger;

export interface TransformerLogger {
  circularGenericNotSupported(nodeName: string): void;

  unexpectedCreateMock(mockFileName: string, expectedFileName: string): void;

  typeNotSupported(type: string, currentNode?: ts.Node): void;

  typeOfFunctionCallNotFound(node: string): void;

  typeOfPropertyNotFound(node: ts.Node): void;

  missingTypeDefinition(node: ts.Node): void;
  missingReturnFromFunctionLike(node: ts.Node): void;
  typeCannotBeChecked(node: ts.Node): void;

  indexedAccessTypeFailed(
    propertyName: string,
    nodeText: string,
    currentNode: ts.Node,
  ): void;
}

const notSupportedTypeMessage: (
  type: string,
  createMockFileUrl: string,
  currentNodeFileUrl: string,
) => string = (
  type: string,
  createMockFileUrl: string,
  currentNodeFileUrl: string,
) => `Not supported type: ${type} - it will convert to null
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`;

const warningPositionLog: (
  createMockFileUrl: string,
  currentNodeFileUrl: string,
) => string = (
  createMockFileUrl: string,
  currentNodeFileUrl: string,
) => `created ${createMockFileUrl}
used by ${currentNodeFileUrl}`;

export const getNodeFileUrl: (node: ts.Node) => string = (node: ts.Node) => {
  const sourceFile: ts.SourceFile = node.getSourceFile();
  const { line, character }: ts.LineAndCharacter =
    sourceFile.getLineAndCharacterOfPosition(node.getStart());

  return `file://${sourceFile.fileName}:${line + 1}:${character + 1}`;
};

export function TransformerLogger(): TransformerLogger {
  logger = logger || Logger('Transformer');

  return {
    circularGenericNotSupported(nodeName: string): void {
      logger.warning(
        `Found a circular generic of \`${nodeName}' and such generics are currently not supported. 
        The generated mock will be incomplete.`,
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
        notSupportedTypeMessage(type, createMockFileUrl, currentNodeFileUrl),
      );
    },
    typeOfFunctionCallNotFound(node: string): void {
      logger.warning(
        `Cannot find type of function call: ${node} - it will convert to null`,
      );
    },
    typeOfPropertyNotFound(node: ts.Node): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(node);

      logger.warning(
        `The transformer could not determine a property value for ${node.getText()} without a specified type nor an initializer value - it will convert to null
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`,
      );
    },
    indexedAccessTypeFailed(
      propertyName: string,
      nodeText: string,
      currentNode: ts.Node,
    ): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(currentNode);

      logger.warning(
        `IndexedAccessType transformation failed: cannot find property ${propertyName} of - ${nodeText}
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`,
      );
    },
    missingTypeDefinition(node: ts.Node): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(node);

      logger.warning(
        `Type definition for type reference ${node.getText()} not found - it will convert to null
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`,
      );
    },
    missingReturnFromFunctionLike(node: ts.Node): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(node);

      logger.warning(
        `Node body or return type for type reference ${node.getText()} not found - it will convert to null
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`,
      );
    },
    typeCannotBeChecked(node: ts.Node): void {
      const createMockNode: ts.Node = GetCurrentCreateMock();

      const createMockFileUrl: string = getNodeFileUrl(createMockNode);
      const currentNodeFileUrl: string = getNodeFileUrl(node);

      logger.warning(
        `the type to type node conversion returned a type that will fail to convert because it cannot be analyzed ${node.getText()} not found - it will convert to null
${warningPositionLog(createMockFileUrl, currentNodeFileUrl)}`,
      );
    },
  };
}
