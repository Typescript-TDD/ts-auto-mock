import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { TransformerLogger } from '../../logger/transformerLogger';
import { convertNodeToTypeNode } from '../typeNode/convertNodeToTypeNode';

export function GetReturnTypeFromBodyDescriptor(
  node:
    | ts.ArrowFunction
    | ts.FunctionExpression
    | ts.MethodDeclaration
    | ts.FunctionDeclaration,
  scope: Scope,
): ts.Expression {
  return GetDescriptor(GetReturnNodeFromBody(node), scope);
}

export function GetReturnNodeFromBody(
  node: ts.FunctionLikeDeclaration,
): ts.Node {
  const functionBody: ts.ConciseBody | undefined = node.body;

  if (!functionBody) {
    TransformerLogger().missingReturnFromFunctionLike(node);
    return GetNullDescriptor();
  }

  if (core.ts.isBlock(functionBody)) {
    const returnStatement: ts.ReturnStatement =
      GetReturnStatement(functionBody);

    if (!returnStatement || !returnStatement.expression) {
      TransformerLogger().missingReturnFromFunctionLike(node);
      return GetNullDescriptor();
    }

    return returnStatement.expression;
  }

  if (core.ts.isBinaryExpression(functionBody)) {
    return convertNodeToTypeNode(functionBody);
  }

  if (core.ts.isTemplateExpression(functionBody)) {
    return convertNodeToTypeNode(functionBody);
  }

  if (core.ts.isPrefixUnaryExpression(functionBody)) {
    return convertNodeToTypeNode(functionBody);
  }

  if (core.ts.isArrayLiteralExpression(functionBody)) {
    return convertNodeToTypeNode(functionBody);
  }

  return functionBody;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement {
  return body.statements.find(
    (statement: ts.Statement) =>
      statement.kind === core.ts.SyntaxKind.ReturnStatement,
  ) as ts.ReturnStatement;
}
