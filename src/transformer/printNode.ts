import * as ts from 'typescript';
import { Logger } from '../logger/logger';
import { ILogger } from '../logger/logger.interface';

export function NodeToString(node: ts.Node): string {
  const resultFile: ts.SourceFile = ts.createSourceFile('someFileName.ts', '', ts.ScriptTarget.Latest, /* setParentNodes*/ false, ts.ScriptKind.TS);
  const printer: ts.Printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  return printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
}

export function PrintNode(node: ts.Node): void {
  const PrintNodeLogger: ILogger = Logger('PrintNode');

  try {
    PrintNodeLogger.info(NodeToString(node));
  } catch (e) {
    PrintNodeLogger.warning('There was an error printing the node');
  }
}
