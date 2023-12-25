import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { PropertySignatureCache } from '../property/cache';
import { GetReturnTypeFromBodyDescriptor } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

type FunctionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(
  node: FunctionAssignment,
  scope: Scope,
): ts.Expression {
  const property: ts.PropertyName = PropertySignatureCache.instance.get();
  const returnValue: ts.Expression = GetReturnTypeFromBodyDescriptor(
    node,
    scope,
  );

  return GetMethodDescriptor(property, returnValue);
}
