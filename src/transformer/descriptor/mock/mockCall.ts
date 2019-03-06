import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetMockMarkerProperty } from "./mockMarker";

export function GetMockCall(declarations: Array<ts.VariableDeclaration>, properties: Array<ts.AccessorDeclaration>): ts.CallExpression {
    const statements = [];

    if (declarations.length) {
        const variableStatement = ts.createVariableStatement([], declarations);

        statements.push(variableStatement);
    }

    const mockMarkerProperty = GetMockMarkerProperty();
    const propertiesToAssign = [...properties, mockMarkerProperty];
    const returnStatement = ts.createReturn(
        ts.createObjectLiteral(propertiesToAssign, true)
    );

    statements.push(returnStatement);

    const arrowFunctionBlock = ts.createBlock(statements);
    const arrowFunction = TypescriptHelper.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}