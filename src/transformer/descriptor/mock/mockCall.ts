import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";

export function GetMockCall(declarations: Array<ts.VariableDeclaration>, access: Array<ts.AccessorDeclaration>): ts.CallExpression {
    const statements = [];

    if (declarations.length) {
        const variableStatement = ts.createVariableStatement([], declarations);

        statements.push(variableStatement);
    }

    const returnStatement = ts.createReturn(
        ts.createObjectLiteral(access, true)
    );

    statements.push(returnStatement);

    const arrowFunctionBlock = ts.createBlock(statements);
    const arrowFunction = TypescriptHelper.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}