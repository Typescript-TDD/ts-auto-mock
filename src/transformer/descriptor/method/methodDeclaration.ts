import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetFunctionReturnType } from './functionReturnType';
import { GetMethodDescriptor } from './method';

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  const returnTypeNode: ts.Node = GetFunctionReturnType(node);
  const returnType: ts.Expression = GetDescriptor(returnTypeNode, scope);

  if (!node.name) {
    throw new Error('Unhandled');
  }

  return GetMethodDescriptor(node.name, returnType);
}
