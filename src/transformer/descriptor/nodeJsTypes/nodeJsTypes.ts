import type * as ts from 'typescript';

const NodeJsTypesGlobalFile: string = 'node_modules/@types/node/globals.d.ts';

export function IsNodeJsType(node: ts.Node): boolean {
  const nodeFile: ts.SourceFile = node.getSourceFile();

  if (nodeFile) {
    const fileName: string = nodeFile.fileName;
    return fileName.includes(NodeJsTypesGlobalFile);
  }

  return false;
}
