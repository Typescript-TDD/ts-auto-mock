import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetProperties } from '../properties/properties';

export function GetParenthesizedDescriptor(
  node: ts.ParenthesizedTypeNode,
  scope: Scope
): ts.Expression {
  return GetProperties(node.type, scope);
}
