import * as ts from 'typescript';
import { GetReturnNodeFromBody } from './bodyReturnType';

export function GetFunctionReturnType(
  node: ts.FunctionLikeDeclaration
): ts.Node {
  let returnType: ts.Node;

  if (node.type) {
    returnType = node.type;
  } else {
    returnType = GetReturnNodeFromBody(node);
  }

  return returnType;
}
