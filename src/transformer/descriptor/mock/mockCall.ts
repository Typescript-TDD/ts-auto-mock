import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { GetMockInternalValuesName, GetMockObjectReturnValueName } from './mockDeclarationName';
import { GetMockMarkerProperty, Property } from './mockMarker';

export function GetMockCall(
    
    properties: ts.PropertyAssignment[],
    signature: ts.Expression): ts.CallExpression {
    const mockObjectReturnValueName: ts.Identifier = GetMockObjectReturnValueName();
    const mockInternalValuesName: ts.Identifier = GetMockInternalValuesName();

    const statements: ts.Statement[] = [
        ts.createVariableStatement([], [
            TypescriptCreator.createVariableDeclaration(mockInternalValuesName, ts.createObjectLiteral()),
            TypescriptCreator.createVariableDeclaration(mockObjectReturnValueName, ts.createObjectLiteral()),
        ]),
    ];

    if (signature) {
        statements.push(AssignVariableTo(mockObjectReturnValueName, signature));
    }

    const addPropertiesToUniqueVariable: ts.ExpressionStatement = AssignPropertiesTo(properties, mockObjectReturnValueName);
    statements.push(addPropertiesToUniqueVariable);

    const addMockMarkerToUniqueVariable: ts.ExpressionStatement = AssignMockMarkerPropertyTo(mockObjectReturnValueName);
    statements.push(addMockMarkerToUniqueVariable);

    statements.push(ts.createReturn(mockObjectReturnValueName));

    const functionBlock: ts.Block = ts.createBlock(statements);
    const functionExpression: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(functionBlock);
    const IFFEFunction: ts.ParenthesizedExpression = ts.createParen(functionExpression);
    return ts.createCall(IFFEFunction, [], []);
}

function AssignVariableTo(variable: ts.Identifier, expression: ts.Expression): ts.ExpressionStatement {
    const binaryExpression: ts.BinaryExpression = ts.createBinary(variable, ts.SyntaxKind.EqualsToken, expression);
    return ts.createExpressionStatement(binaryExpression);
}

function AssignMockMarkerPropertyTo(identifier: ts.Identifier): ts.ExpressionStatement {
    const mockMarkerProperty: Property = GetMockMarkerProperty();

    const argumentsDefineProperty: Array<ts.Expression> = [
        identifier,
        mockMarkerProperty.name,
        ts.createObjectLiteral([ts.createPropertyAssignment('value', mockMarkerProperty.value)]),
    ];

    const objectDefineProperty: ts.PropertyAccessExpression = ts.createPropertyAccess(ts.createIdentifier('Object'), ts.createIdentifier('defineProperty'));
    const objectDefinePropertyCall: ts.CallExpression = ts.createCall(objectDefineProperty, [], argumentsDefineProperty);
    return ts.createExpressionStatement(objectDefinePropertyCall);
}

function AssignPropertiesTo(properties: ts.PropertyAssignment[], uniqueVariable: ts.Identifier): ts.ExpressionStatement {
    const propertiesObject: ts.ObjectLiteralExpression = ts.createObjectLiteral(properties, true);

    const propertyAccessExpression: ts.PropertyAccessExpression = ts.createPropertyAccess(
        ts.createIdentifier('Object'),
        ts.createIdentifier('defineProperties'),
    );

    const callToObjectDefineProperties: ts.CallExpression = ts.createCall(
        propertyAccessExpression,
        undefined,
        [
            uniqueVariable,
            propertiesObject,
        ],
    );
    return ts.createExpressionStatement(callToObjectDefineProperties);
}
