import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { createFunctionExpressionReturn } from '../../../typescriptFactory/typescriptFactory';

export function GetConstructorTypeDescriptor(
  node: ts.ConstructorTypeNode,
  scope: Scope
): ts.Expression {
  return createFunctionExpressionReturn(GetDescriptor(node.type, scope));
}
