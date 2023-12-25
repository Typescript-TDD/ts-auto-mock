import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export function GetTypeAliasDescriptor(
  node: ts.TypeAliasDeclaration,
  scope: Scope,
): ts.Expression {
  return GetDescriptor(node.type, scope);
}
