import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { TransformerLogger } from '../../logger/transformerLogger';

export function GetTypeOperatorDescriptor(
  node: ts.TypeOperatorNode,
  scope: Scope,
): ts.Expression {
  switch (node.operator) {
    case core.ts.SyntaxKind.ReadonlyKeyword:
    case core.ts.SyntaxKind.UniqueKeyword:
      return GetDescriptor(node.type, scope);
    case core.ts.SyntaxKind.KeyOfKeyword:
    default:
      TransformerLogger().typeNotSupported(
        `TypeOperator of ${core.ts.SyntaxKind[node.operator]}`,
        node,
      );
      return GetNullDescriptor();
  }
}
