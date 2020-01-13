import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockIdentifierInternalValues, MockIdentifierObjectReturnValue } from '../../mockIdentifier/mockIdentifier';
import { TypescriptHelper } from '../helper/helper';
import { GetMockMarkerProperty, Property } from './mockMarker';
import { PropertyAssignments } from './mockProperty';

export function GetMockCall(properties: PropertyAssignments, signature: ts.Expression): ts.CallExpression {
    const mockObjectReturnValueName: ts.Identifier = MockIdentifierObjectReturnValue;
    const statements: ts.Statement[] = [
        ts.createVariableStatement([], [
            TypescriptCreator.createVariableDeclaration(MockIdentifierInternalValues, ts.createObjectLiteral()),
            TypescriptCreator.createVariableDeclaration(mockObjectReturnValueName, signature || ts.createObjectLiteral(properties.literals)),
        ]),
    ];

    if (signature) {
        let literalProperty: ts.PropertyAssignment;
        let index: number = 0;

        // tslint:disable-next-line:no-conditional-assignment
        while ((literalProperty = properties.literals[index++])) {
            statements.push(AssignLiteralPropertyTo(mockObjectReturnValueName, literalProperty));
        }
    }

    if (properties.lazy.length) {
        const addPropertiesToUniqueVariable: ts.ExpressionStatement = AssignPropertiesTo(properties.lazy, mockObjectReturnValueName);
        statements.push(addPropertiesToUniqueVariable);
    }

    const addMockMarkerToUniqueVariable: ts.ExpressionStatement = AssignMockMarkerPropertyTo(mockObjectReturnValueName);
    statements.push(addMockMarkerToUniqueVariable);

    statements.push(ts.createReturn(mockObjectReturnValueName));

    const functionBlock: ts.Block = ts.createBlock(statements);
    const functionExpression: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(functionBlock);
    const IFFEFunction: ts.ParenthesizedExpression = ts.createParen(functionExpression);
    return ts.createCall(IFFEFunction, [], []);
}

function AssignVariableTo(variable: ts.Expression, expression: ts.Expression): ts.ExpressionStatement {
    const binaryExpression: ts.BinaryExpression = ts.createBinary(variable, ts.SyntaxKind.EqualsToken, expression);
    return ts.createExpressionStatement(binaryExpression);
}

function AssignLiteralPropertyTo(mockObjectReturnValueName: ts.Identifier, literalProperty: ts.PropertyAssignment): ts.ExpressionStatement {
    const propertyAccess: ts.ElementAccessExpression = ts.createElementAccess(mockObjectReturnValueName, literalProperty.name as ts.StringLiteral);
    return AssignVariableTo(propertyAccess, literalProperty.initializer);
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
