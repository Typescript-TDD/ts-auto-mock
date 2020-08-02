import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetProperties } from '../properties/properties';

export function GetClassDeclarationDescriptor(
  node: ts.ClassDeclaration,
  scope: Scope
): ts.Expression {
  return GetProperties(node, scope);
}
