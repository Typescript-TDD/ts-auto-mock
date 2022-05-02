import type * as ts from 'typescript';

const NodeTypesGlobalFile: string = 'node_modules/@types/node/globals.d.ts';

export function IsNodeType(node: ts.Node): boolean {
  const nodeFile: ts.SourceFile = node.getSourceFile();

  if (nodeFile) {
    const fileName: string = nodeFile.fileName;
    return fileName.includes(NodeTypesGlobalFile);
  }

  return false;
}
