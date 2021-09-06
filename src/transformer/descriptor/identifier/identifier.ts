import type * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetIdentifierDescriptor(
  node: ts.Identifier,
  scope: Scope
): ts.Expression {
  if (
    node.originalKeywordKind &&
    node.originalKeywordKind === SyntaxKind.UndefinedKeyword
  ) {
    return GetUndefinedDescriptor();
  }

  const declaration: ts.Declaration =
    TypescriptHelper.GetDeclarationFromNode(node);
  return GetDescriptor(declaration, scope);
}
