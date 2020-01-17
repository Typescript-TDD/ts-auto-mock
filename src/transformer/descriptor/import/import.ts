import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetTypeImport, ImportNode } from '../type/typeImport';

export function GetImportDescriptor(node: ImportNode, scope: Scope): ts.Expression {
  const type: ts.Node = GetTypeImport(node);
  return GetDescriptor(type, scope);
}
