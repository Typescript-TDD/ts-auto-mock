import * as ts from 'typescript';
import { GetReturnNodeFromBody } from './bodyReturnType';

function isFunctionLikeDeclaration(node: ts.SignatureDeclaration): node is ts.FunctionLikeDeclaration {
  switch (true) {
    case ts.isFunctionDeclaration(node):
    case ts.isMethodDeclaration(node):
    case ts.isGetAccessorDeclaration(node):
    case ts.isSetAccessorDeclaration(node):
    case ts.isConstructorDeclaration(node):
    case ts.isFunctionExpression(node):
    case ts.isArrowFunction(node):
      return true;
  }

  return false;
}

export function GetFunctionReturnType(node: ts.SignatureDeclaration): ts.Node {
  const declaredReturnType: ts.TypeNode | undefined = node.type;
  if (declaredReturnType) {
    return declaredReturnType;
  }

  if (isFunctionLikeDeclaration(node)) {
    return GetReturnNodeFromBody(node);
  }

  if (!declaredReturnType) {
    throw new Error(
      `The transformer couldn't determine the type of ${node.getText()}. Did you declare its type?`,
    );
  }

  return declaredReturnType;
}
