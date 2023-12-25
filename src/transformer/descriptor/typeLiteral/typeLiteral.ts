import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetProperties } from '../properties/properties';

export function GetTypeLiteralDescriptor(
  node: ts.TypeLiteralNode,
  scope: Scope,
): ts.Expression {
  return GetProperties(node, scope);
}
