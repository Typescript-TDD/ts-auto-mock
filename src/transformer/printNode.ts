import * as ts from 'typescript';
import { Logger } from '../logger/logger';
import { ILogger } from '../logger/logger.interface';

export function PrintNode(node: ts.Node): void {
    const PrintNodeLogger: ILogger = Logger('PrintNode');

    const resultFile: ts.SourceFile = ts.createSourceFile('someFileName.ts', '', ts.ScriptTarget.Latest, /*setParentNodes*/ false, ts.ScriptKind.TS);
    const printer: ts.Printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    try {
        const result: string = printer.printNode(ts.EmitHint.Unspecified, node, resultFile);
        PrintNodeLogger.info(result);
    } catch (e) {
        PrintNodeLogger.warning('There was an error printing the node');
    }

}
