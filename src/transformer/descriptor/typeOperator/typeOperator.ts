import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { TransformerLogger } from '../../logger/transformerLogger';

export function GetTypeOperatorDescriptor(
  node: ts.TypeOperatorNode,
  scope: Scope
): ts.Expression {
  switch (node.operator) {
    case ts.SyntaxKind.ReadonlyKeyword:
    case ts.SyntaxKind.UniqueKeyword:
      return GetDescriptor(node.type, scope);
    case ts.SyntaxKind.KeyOfKeyword:
    default:
      TransformerLogger().typeNotSupported(
        `TypeOperator of ${ts.SyntaxKind[node.operator]}`,
        node
      );
      return GetNullDescriptor();
  }
}
