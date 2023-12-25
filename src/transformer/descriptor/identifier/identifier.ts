import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { core } from '../../core/core';

export function GetIdentifierDescriptor(
  node: ts.Identifier,
  scope: Scope
): ts.Expression {
  if (
      core.ts.identifierToKeywordKind(node) === core.ts.SyntaxKind?.UndefinedKeyword
  ) {
    return GetUndefinedDescriptor();
  }

  const declaration: ts.Declaration =
    TypescriptHelper.GetDeclarationFromNode(node);
  return GetDescriptor(declaration, scope);
}
