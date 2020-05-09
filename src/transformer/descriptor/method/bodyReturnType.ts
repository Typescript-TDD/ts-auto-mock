import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';

export function GetReturnTypeFromBodyDescriptor(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  return GetDescriptor(GetReturnNodeFromBody(node), scope);
}

export function GetReturnNodeFromBody<T extends ts.Node & { body?: ts.ConciseBody }>(node: T): ts.Expression {
  const functionBody: ts.ConciseBody | undefined = node.body;

  if (!functionBody) {
    return GetNullDescriptor();
  }

  if (!ts.isBlock(functionBody)) {
    return functionBody;
  }

  const returnStatement: ts.ReturnStatement | undefined = GetReturnStatement(functionBody);

  if (!returnStatement?.expression) {
    return GetNullDescriptor();
  }

  return returnStatement.expression;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement | undefined {
  return body.statements.find(
    (statement: ts.Statement): statement is ts.ReturnStatement => statement.kind === ts.SyntaxKind.ReturnStatement,
  );
}
