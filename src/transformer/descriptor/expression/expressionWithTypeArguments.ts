import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export function GetExpressionWithTypeArgumentsDescriptor(
  node: ts.ExpressionWithTypeArguments,
  scope: Scope
): ts.Expression {
  return GetDescriptor(node.expression, scope);
}
