import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { GetMethodDescriptor } from './method';

export function GetMethodSignatureDescriptor(node: ts.MethodSignature, scope: Scope): ts.Expression {
  let returnType: ts.Expression;

  if (node.type) {
    returnType = GetDescriptor(node.type, scope);
  } else {
    returnType = GetNullDescriptor();
  }

  return GetMethodDescriptor(node.name, returnType);
}
