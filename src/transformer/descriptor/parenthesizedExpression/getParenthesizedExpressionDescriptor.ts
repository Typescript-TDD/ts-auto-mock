import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export const GetParenthesizedExpressionDescriptor: (
  node: ts.ParenthesizedExpression,
  scope: Scope
) => ts.Expression = (node: ts.ParenthesizedExpression, scope: Scope) =>
  GetDescriptor(node.expression, scope);
