import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { TypescriptHelper } from '../helper/helper';
import { GetDescriptor } from '../descriptor';

export const GetShorthandPropertyAssignmentDescriptor: (
  node: ts.ShorthandPropertyAssignment,
  scope: Scope
) => ts.Expression = (node: ts.ShorthandPropertyAssignment, scope) => {
  const typeChecker: ts.TypeChecker = core.typeChecker;

  const symbol: ts.Symbol | undefined =
    typeChecker.getShorthandAssignmentValueSymbol(node);

  if (!symbol) {
    throw new Error(
      `The type checker failed to look up a symbol for \`${node.getText()}'. 
        Perhaps, the checker was searching an outdated source.`
    );
  }

  const declaration: ts.Declaration =
    TypescriptHelper.GetDeclarationFromSymbol(symbol);

  return GetDescriptor(declaration, scope);
};
