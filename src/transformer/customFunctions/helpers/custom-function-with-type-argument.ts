import type * as ts from 'typescript';
import { CustomFunction } from '../../matcher/matcher';
import { assertTypeArgumentPresence } from './assert-type-argument-presence';

function isDeclarationWithName(
  declaration: ts.SignatureDeclaration,
  declarationName: string,
): boolean {
  return declaration.name?.getText() === declarationName;
}

export function customFunctionWithTypeArgument(
  sourceName: string,
  declarationName: string,
  run: (node: ts.CallExpression, typeArgument: ts.TypeNode) => ts.Node,
): CustomFunction {
  return {
    sourceDts: sourceName,
    sourceUrl: `../${sourceName}`,
    isHandledFunction(
      node: ts.CallExpression,
      declaration: ts.SignatureDeclaration,
    ): boolean {
      return isDeclarationWithName(declaration, declarationName);
    },
    run(node: ts.CallExpression): ts.Node {
      assertTypeArgumentPresence(node);
      const [nodeToMock]: ts.NodeArray<ts.TypeNode> = node.typeArguments;

      return run(node, nodeToMock);
    },
  };
}
