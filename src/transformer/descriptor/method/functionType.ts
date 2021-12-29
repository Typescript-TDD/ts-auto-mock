import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { PropertySignatureCache } from '../property/cache';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { GetMethodDescriptor } from './method';

export function GetFunctionTypeDescriptor(
  node:
    | ts.FunctionTypeNode
    | ts.CallSignatureDeclaration
    | ts.ConstructSignatureDeclaration,
  scope: Scope
): ts.Expression {
  const property: ts.PropertyName = PropertySignatureCache.instance.get();

  const returnValue: ts.Expression = node.type
    ? GetDescriptor(node.type, scope)
    : GetUndefinedDescriptor();

  return GetMethodDescriptor(property, returnValue);
}
