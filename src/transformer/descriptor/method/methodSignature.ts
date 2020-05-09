import ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetMethodDescriptor } from './method';

export function GetMethodSignatureDescriptor(node: ts.MethodSignature, scope: Scope): ts.Expression {
  return GetMethodDescriptor(node.name, [node], scope);
}
