import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetIdentifierDescriptor(node: ts.Identifier, scope: Scope): ts.Expression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node);
  return GetDescriptor(declaration, scope);
}
