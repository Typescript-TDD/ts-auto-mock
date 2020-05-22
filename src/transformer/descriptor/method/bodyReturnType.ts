import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';

export function GetReturnTypeFromBodyDescriptor(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  return GetDescriptor(GetReturnNodeFromBody(node), scope);
}

export function GetReturnNodeFromBody(node: ts.FunctionLikeDeclaration): ts.Expression {
  let returnValue: ts.Expression | undefined;

  const functionBody: ts.ConciseBody | undefined = node.body;

  if (functionBody && ts.isBlock(functionBody)) {
    const returnStatement: ts.ReturnStatement | undefined = GetReturnStatement(functionBody);

    if (returnStatement) {
      returnValue = returnStatement.expression;
    } else {
      returnValue = GetNullDescriptor();
    }
  } else {
    returnValue = functionBody;
  }

  if (!returnValue) {
    throw new Error(`Failed to determine the return value of ${node.getText()}.`);
  }

  return returnValue;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement | undefined {
  return body.statements.find(
    (statement: ts.Statement): statement is ts.ReturnStatement => statement.kind === ts.SyntaxKind.ReturnStatement,
  );
}
