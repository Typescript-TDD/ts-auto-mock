import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { GetMockMarkerProperty, Property } from './mockMarker';

export function GetMockCall(
    declarations: ts.VariableDeclaration[],
    properties: ts.PropertyAssignment[],
    signature: ts.Expression): ts.CallExpression {
    const uniqueVariable: ts.Identifier = CreateUniqueTsAutoMockVariable();
    const listOfVariables: ts.VariableStatement = GetListOfVariables(declarations, uniqueVariable);

    const statements: ts.Statement[] = [
        listOfVariables,
    ];

    if (signature) {
        statements.push(AssignVariableTo(uniqueVariable, signature));
    }

    const addPropertiesToUniqueVariable: ts.ExpressionStatement = AssignPropertiesTo(properties, uniqueVariable);
    statements.push(addPropertiesToUniqueVariable);

    const addMockMarkerToUniqueVariable: ts.ExpressionStatement = AssignMockMarkerPropertyTo(uniqueVariable);
    statements.push(addMockMarkerToUniqueVariable);

    statements.push(ts.createReturn(uniqueVariable));

    const arrowFunctionBlock: ts.Block = ts.createBlock(statements);
    const arrowFunction: ts.ArrowFunction = TypescriptCreator.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction: ts.ParenthesizedExpression = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}

function GetListOfVariables(declarations: ts.VariableDeclaration[], identifierUniqueNameVariable: ts.Identifier): ts.VariableStatement {
    const variableDeclarationUnique: ts.VariableDeclaration = ts.createVariableDeclaration(identifierUniqueNameVariable, undefined, ts.createObjectLiteral());
    const variables: ts.VariableDeclaration[] = declarations.length ? [...declarations, variableDeclarationUnique] : [variableDeclarationUnique];
    return ts.createVariableStatement([], variables);
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

function CreateUniqueTsAutoMockVariable(): ts.Identifier  {
    return ts.createIdentifier('__tsAutoMockObjectReturnValue');
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
