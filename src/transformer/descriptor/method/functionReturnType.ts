import * as ts from 'typescript';
import { GetReturnNodeFromBody } from './bodyReturnType';

export function GetFunctionReturnType(node: ts.SignatureDeclaration): ts.Node {
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    return GetReturnNodeFromBody(node);
  }

  if (!node.type) {
    throw new Error(
      `The transformer couldn't determine the type of ${node.getText()}. Did you declare its type?`,
    );
  }

  return node.type;
}
