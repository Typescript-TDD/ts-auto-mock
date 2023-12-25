import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetFunctionReturnType } from '../method/functionReturnType';
import { PropertySignatureCache } from '../property/cache';

export function GetGetAccessorDeclarationDescriptor(
  node: ts.GetAccessorDeclaration,
  scope: Scope,
): ts.Expression {
  PropertySignatureCache.instance.set(node.name);
  const returnTypeNode: ts.Node = GetFunctionReturnType(node);

  return GetDescriptor(returnTypeNode, scope);
}
