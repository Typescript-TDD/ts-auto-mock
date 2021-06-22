import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetObjectLiteralDescriptor(
  node: ts.ObjectLiteralExpression,
  scope: Scope
): ts.Expression {
  const typeChecker: ts.TypeChecker = core.typeChecker;
  const type: ts.Type = typeChecker.getTypeAtLocation(node);
  const symbols: ts.Symbol[] = core.typeChecker.getPropertiesOfType(type);

  return GetMockPropertiesFromSymbol(symbols, [], scope);
}
