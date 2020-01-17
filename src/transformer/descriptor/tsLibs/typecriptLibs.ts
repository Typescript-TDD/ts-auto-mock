import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypescriptLibsTypeAdapter } from './typescriptLibsTypeAdapter';
import { TypescriptLibsTypesFolder } from './typescriptLibsTypes';

export function IsTypescriptType(node: ts.Node): boolean {
  const nodeFile: ts.SourceFile = node.getSourceFile();

  if (nodeFile) {
    const fileName: string = nodeFile.fileName;
    return fileName.includes(TypescriptLibsTypesFolder);
  }

  return false;
}

export function GetTypescriptType(node: ts.TypeReferenceNode, scope: Scope): ts.Node {
  return TypescriptLibsTypeAdapter(node, scope);
}
