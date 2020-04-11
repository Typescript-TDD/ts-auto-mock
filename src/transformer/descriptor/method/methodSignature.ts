import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { GetMethodDescriptor } from './method';

export function GetMethodSignatureDescriptor(node: ts.MethodSignature, scope: Scope): ts.Expression {
  let returnValue: ts.Expression;

  if (node.type) {
    returnValue = GetDescriptor(node.type, scope);
  } else {
    returnValue = GetNullDescriptor();
  }

  return GetMethodDescriptor(node.name, [{ returnValue }]);
}
