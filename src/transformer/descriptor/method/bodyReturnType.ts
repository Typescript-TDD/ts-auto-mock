import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';

export function GetReturnTypeFromBodyDescriptor(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  return GetDescriptor(GetReturnNodeFromBody(node), scope);
}

export function GetReturnNodeFromBody(node: ts.FunctionLikeDeclaration): ts.Node {
  let returnValue: ts.Node;

  const functionBody: ts.ConciseBody = node.body;

  if (ts.isBlock(functionBody)) {
    const returnStatement: ts.ReturnStatement = GetReturnStatement(functionBody);

    if (returnStatement) {
      returnValue = returnStatement.expression;
    } else {
      returnValue = GetNullDescriptor();
    }
  } else {
    returnValue = node.body;
  }

  return returnValue;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement {
  return body.statements.find((statement: ts.Statement) => statement.kind === ts.SyntaxKind.ReturnStatement) as ts.ReturnStatement;
}
