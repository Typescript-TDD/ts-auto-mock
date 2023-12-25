import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetNullDescriptor } from '../null/null';
import { GetDescriptor } from '../descriptor';

export const GetVariableDeclarationDescriptor: (
  node: ts.VariableDeclaration,
  scope: Scope,
) => ts.Expression = (node: ts.VariableDeclaration, scope: Scope) => {
  const typeChecker: ts.TypeChecker = core.typeChecker;
  const coreTs: typeof core.ts = core.ts;
  if (node.type) {
    return GetDescriptor(node.type, scope);
  }

  const symbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(
    node.name,
  );

  if (!symbol) {
    throw new Error(
      `The type checker failed to look up a symbol for \`${node.getText()}'. 
        Perhaps, the checker was searching an outdated source.`,
    );
  }

  const type: ts.Type = typeChecker.getTypeOfSymbolAtLocation(symbol, node);
  const typeToNode: ts.TypeNode | undefined = typeChecker.typeToTypeNode(
    type,
    undefined,
    undefined,
  );

  if (!typeToNode) {
    throw new Error(
      `The type checker failed to look up a node for \`${node.getText()}'. 
        Perhaps, the checker was searching an outdated source.`,
    );
  }

  if (coreTs.isTypeLiteralNode(typeToNode)) {
    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);
    return GetMockPropertiesFromSymbol(properties, [], scope);
  }

  if (coreTs.isLiteralTypeNode(typeToNode)) {
    return GetDescriptor(typeToNode.literal, scope);
  }

  return GetNullDescriptor();
};
