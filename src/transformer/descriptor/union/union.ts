import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { GetTypes } from '../type/type';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetUnionDescriptor(
  node: ts.UnionTypeNode,
  scope: Scope,
): ts.Expression {
  const findNodes: ts.Node[] = GetTypes(node.types, scope);

  if (scope.hydrated) {
    const removeUndefinedNodes: ts.Node[] = findNodes.filter(
      (typeNode: ts.TypeNode) => !isNotDefinedType(typeNode),
    );

    if (removeUndefinedNodes.length) {
      return GetDescriptor(removeUndefinedNodes[0], scope);
    }

    return GetUndefinedDescriptor();
  }

  const notDefinedType: ts.Node[] = findNodes.filter((typeNode: ts.TypeNode) =>
    isNotDefinedType(typeNode),
  );

  if (notDefinedType.length) {
    return GetUndefinedDescriptor();
  }

  return GetDescriptor(node.types[0], scope);
}

function isNotDefinedType(typeNode: ts.Node): boolean {
  return (
    typeNode.kind === core.ts.SyntaxKind.VoidKeyword ||
    typeNode.kind === core.ts.SyntaxKind.UndefinedKeyword
  );
}
