import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';

export function GetReturnTypeFromBody(node: ts.ArrowFunction | ts.FunctionExpression | ts.MethodDeclaration): ts.Expression {
    let returnValue: ts.Expression;

    const functionBody: ts.FunctionBody = node.body as ts.FunctionBody;

    if (functionBody.statements) {
        const returnStatement: ts.ReturnStatement = GetReturnStatement(functionBody);

        if (returnStatement) {
            returnValue = GetDescriptor(returnStatement.expression);
        } else {
            returnValue = GetNullDescriptor();
        }
    } else {
        returnValue = GetDescriptor(node.body);
    }

    return returnValue;
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement {
    return body.statements.find((statement: ts.Statement) => {
        return statement.kind === ts.SyntaxKind.ReturnStatement;
    }) as ts.ReturnStatement;
}
