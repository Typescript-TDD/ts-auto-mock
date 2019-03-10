import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetMockMarkerProperty, Property } from "./mockMarker";

export function GetMockCall(declarations: Array<ts.VariableDeclaration>, properties: Array<ts.AccessorDeclaration>): ts.CallExpression {
    const uniqueNameVariable = "__tsAutoMockObjectReturnValue";
    const identifierUniqueNameVariable = ts.createIdentifier(uniqueNameVariable);
    
    const listOfVariables = GetListOfVariables(declarations, identifierUniqueNameVariable);

    const mockMarkerPropertyAssigned = GetMockMarkerPropertyAssignedTo(identifierUniqueNameVariable);
    
    const objectToReturn = GetObjectWithPropertiesToReturn(properties, identifierUniqueNameVariable);
    
    const returnStatement = ts.createReturn(identifierUniqueNameVariable);
    
    const statements = [
        listOfVariables,
        objectToReturn,
        mockMarkerPropertyAssigned,
        returnStatement
    ];

    const arrowFunctionBlock = ts.createBlock(statements);
    const arrowFunction = TypescriptHelper.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}

function GetListOfVariables(declarations: Array<ts.VariableDeclaration>, identifierUniqueNameVariable: ts.Identifier): ts.VariableStatement {
    const variableDeclarationUnique = ts.createVariableDeclaration(identifierUniqueNameVariable, undefined, ts.createObjectLiteral());
    const variables =  declarations.length ? [...declarations, variableDeclarationUnique]: [variableDeclarationUnique];
    return ts.createVariableStatement([], variables);
}

function GetObjectWithPropertiesToReturn(properties: Array<ts.AccessorDeclaration>, identifierUniqueNameVariable: ts.Identifier): ts.ExpressionStatement {
    const returnObject = ts.createObjectLiteral(properties, true);
    const binaryExpression = ts.createBinary(identifierUniqueNameVariable, ts.SyntaxKind.EqualsToken, returnObject);
    return ts.createExpressionStatement(binaryExpression);
}

function GetMockMarkerPropertyAssignedTo(identifier: ts.Identifier): ts.ExpressionStatement {
    const mockMarkerProperty: Property = GetMockMarkerProperty();
    
    const argumentsDefineProperty = [
        identifier,
        mockMarkerProperty.name,
        ts.createObjectLiteral([ts.createPropertyAssignment("value", mockMarkerProperty.value)])
    ];
    
    const objectDefineProperty = ts.createPropertyAccess(ts.createIdentifier("Object"), ts.createIdentifier("defineProperty"));
    const objectDefinePropertyCall = ts.createCall(objectDefineProperty, [], argumentsDefineProperty);
    return ts.createExpressionStatement(objectDefinePropertyCall);
}
