import * as ts from 'typescript';
import { TypescriptHelper } from '../helper/helper';
import { GetMockMarkerProperty, Property } from './mockMarker';

export function GetMockCall(declarations: ts.VariableDeclaration[], properties: ts.AccessorDeclaration[]): ts.CallExpression {
    const uniqueNameVariable: string = '__tsAutoMockObjectReturnValue';
    const identifierUniqueNameVariable: ts.Identifier = ts.createIdentifier(uniqueNameVariable);

    const listOfVariables: ts.VariableStatement = GetListOfVariables(declarations, identifierUniqueNameVariable);

    const mockMarkerPropertyAssigned: ts.ExpressionStatement = GetMockMarkerPropertyAssignedTo(identifierUniqueNameVariable);

    const objectToReturn: ts.ExpressionStatement = GetObjectWithPropertiesToReturn(properties, identifierUniqueNameVariable);

    const returnStatement: ts.ReturnStatement = ts.createReturn(identifierUniqueNameVariable);

    const statements: Array<ts.VariableStatement | ts.ExpressionStatement | ts.ReturnStatement> = [
        listOfVariables,
        objectToReturn,
        mockMarkerPropertyAssigned,
        returnStatement,
    ];

    const arrowFunctionBlock: ts.Block = ts.createBlock(statements);
    const arrowFunction: ts.ArrowFunction = TypescriptHelper.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction: ts.ParenthesizedExpression = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}

function GetListOfVariables(declarations: ts.VariableDeclaration[], identifierUniqueNameVariable: ts.Identifier): ts.VariableStatement {
    const variableDeclarationUnique: ts.VariableDeclaration = ts.createVariableDeclaration(identifierUniqueNameVariable, undefined, ts.createObjectLiteral());
    const variables: ts.VariableDeclaration[] = declarations.length ? [...declarations, variableDeclarationUnique] : [variableDeclarationUnique];
    return ts.createVariableStatement([], variables);
}

function GetObjectWithPropertiesToReturn(properties: ts.AccessorDeclaration[], identifierUniqueNameVariable: ts.Identifier): ts.ExpressionStatement {
    const returnObject: ts.ObjectLiteralExpression = ts.createObjectLiteral(properties, true);
    const binaryExpression: ts.BinaryExpression = ts.createBinary(identifierUniqueNameVariable, ts.SyntaxKind.EqualsToken, returnObject);
    return ts.createExpressionStatement(binaryExpression);
}

function GetMockMarkerPropertyAssignedTo(identifier: ts.Identifier): ts.ExpressionStatement {
    const mockMarkerProperty: Property = GetMockMarkerProperty();

    const argumentsDefineProperty: Array<ts.Identifier | ts.Expression | ts.ObjectLiteralExpression> = [
        identifier,
        mockMarkerProperty.name,
        ts.createObjectLiteral([ts.createPropertyAssignment('value', mockMarkerProperty.value)]),
    ];

    const objectDefineProperty: ts.PropertyAccessExpression = ts.createPropertyAccess(ts.createIdentifier('Object'), ts.createIdentifier('defineProperty'));
    const objectDefinePropertyCall: ts.CallExpression = ts.createCall(objectDefineProperty, [], argumentsDefineProperty);
    return ts.createExpressionStatement(objectDefinePropertyCall);
}
