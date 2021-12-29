import type * as ts from 'typescript';
import { Logger } from '../logger/logger';
import { ILogger } from '../logger/logger.interface';
import { core } from './core/core';

export function NodeToString(node: ts.Node): string {
  const resultFile: ts.SourceFile = core.ts.createSourceFile(
    'someFileName.ts',
    '',
    core.ts.ScriptTarget.Latest,
    /* setParentNodes*/ false,
    core.ts.ScriptKind.TS
  );
  const printer: ts.Printer = core.ts.createPrinter({
    newLine: core.ts.NewLineKind.LineFeed,
  });

  return printer.printNode(core.ts.EmitHint.Unspecified, node, resultFile);
}

export function PrintNode(node: ts.Node): void {
  const PrintNodeLogger: ILogger = Logger('PrintNode');

  try {
    PrintNodeLogger.info(NodeToString(node));
  } catch (e) {
    PrintNodeLogger.warning('There was an error printing the node');
  }
}
