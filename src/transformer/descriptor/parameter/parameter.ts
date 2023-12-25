import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetNullDescriptor } from '../null/null';
import { GetDescriptor } from '../descriptor';

export const GetParameterDescriptor: (
  node: ts.ParameterDeclaration,
  scope: Scope,
) => ts.Expression = (node: ts.ParameterDeclaration, scope: Scope) => {
  if (node.type) {
    return GetDescriptor(node.type, scope);
  }

  if (node.initializer) {
    return GetDescriptor(node.initializer, scope);
  }

  return GetNullDescriptor();
};
