import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetTypeLiteralDescriptor(node: ts.TypeLiteralNode, scope: Scope): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const type: ts.Type = typeChecker.getTypeAtLocation(node);

  const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);
  const signatures: ReadonlyArray<ts.Signature> = type.getCallSignatures();

  return GetMockPropertiesFromSymbol(properties, signatures, scope);
}
