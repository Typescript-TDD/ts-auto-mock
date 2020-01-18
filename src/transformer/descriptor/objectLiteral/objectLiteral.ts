import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetObjectLiteralDescriptor(node: ts.ObjectLiteralExpression, scope: Scope): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const type: ts.Type = typeChecker.getTypeAtLocation(node);
  const symbols: ts.Symbol[] = TypeChecker().getPropertiesOfType(type);

  return GetMockPropertiesFromSymbol(symbols, [], scope);
}
