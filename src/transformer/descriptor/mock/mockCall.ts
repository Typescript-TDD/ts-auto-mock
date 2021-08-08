import type * as ts from 'typescript';
import { Identifiers } from '../../mockIdentifier/mockIdentifier';
import {
  createBinaryExpression,
  createBlock,
  createCall,
  createElementAccessExpression,
  createExpressionStatement,
  createIdentifier,
  createIIFE,
  createObjectLiteral,
  createPropertyAccess,
  createPropertyAssignment,
  createReturn,
  createVariableDeclaration,
  createVariableStatement,
} from '../../../typescriptFactory/typescriptFactory';
import { core } from '../../core/core';
import { GetMockMarkerProperty, Property } from './mockMarker';
import { PropertyAssignments } from './mockPropertiesAssignments';

export function GetMockCall(
  properties: PropertyAssignments,
  signature: ts.Expression | null
): ts.CallExpression {
  const mockObjectReturnValueName: ts.Identifier =
    Identifiers.MockIdentifierObjectReturnValue;
  const statements: ts.Statement[] = [
    createVariableStatement([
      createVariableDeclaration(
        Identifiers.MockIdentifierInternalValues,
        createObjectLiteral()
      ),
      createVariableDeclaration(
        mockObjectReturnValueName,
        signature || createObjectLiteral(properties.literals)
      ),
    ]),
  ];

  if (signature) {
    let literalProperty: ts.PropertyAssignment;
    let index: number = 0;

    // tslint:disable-next-line:no-conditional-assignment
    while ((literalProperty = properties.literals[index++])) {
      statements.push(
        AssignLiteralPropertyTo(mockObjectReturnValueName, literalProperty)
      );
    }
  }

  if (properties.lazy.length) {
    const addPropertiesToUniqueVariable: ts.ExpressionStatement =
      AssignPropertiesTo(properties.lazy, mockObjectReturnValueName);
    statements.push(addPropertiesToUniqueVariable);
  }

  const addMockMarkerToUniqueVariable: ts.ExpressionStatement =
    AssignMockMarkerPropertyTo(mockObjectReturnValueName);
  statements.push(addMockMarkerToUniqueVariable);

  statements.push(createReturn(mockObjectReturnValueName));

  const functionBlock: ts.Block = createBlock(statements);
  return createIIFE(functionBlock);
}

function AssignVariableTo(
  variable: ts.Expression,
  expression: ts.Expression
): ts.ExpressionStatement {
  const binaryExpression: ts.BinaryExpression = createBinaryExpression(
    variable,
    core.ts.SyntaxKind.EqualsToken,
    expression
  );
  return createExpressionStatement(binaryExpression);
}

function AssignLiteralPropertyTo(
  mockObjectReturnValueName: ts.Identifier,
  literalProperty: ts.PropertyAssignment
): ts.ExpressionStatement {
  const propertyAccess: ts.ElementAccessExpression =
    createElementAccessExpression(
      mockObjectReturnValueName,
      literalProperty.name as ts.StringLiteral
    );
  return AssignVariableTo(propertyAccess, literalProperty.initializer);
}

function AssignMockMarkerPropertyTo(
  identifier: ts.Identifier
): ts.ExpressionStatement {
  const mockMarkerProperty: Property = GetMockMarkerProperty();

  const argumentsDefineProperty: Array<ts.Expression> = [
    identifier,
    mockMarkerProperty.name,
    createObjectLiteral([
      createPropertyAssignment('value', mockMarkerProperty.value),
    ]),
  ];

  const objectDefineProperty: ts.PropertyAccessExpression =
    createPropertyAccess(
      createIdentifier('Object'),
      createIdentifier('defineProperty')
    );
  const objectDefinePropertyCall: ts.CallExpression = createCall(
    objectDefineProperty,
    argumentsDefineProperty
  );
  return createExpressionStatement(objectDefinePropertyCall);
}

function AssignPropertiesTo(
  properties: ts.PropertyAssignment[],
  uniqueVariable: ts.Identifier
): ts.ExpressionStatement {
  const propertiesObject: ts.ObjectLiteralExpression = createObjectLiteral(
    properties,
    true
  );

  const propertyAccessExpression: ts.PropertyAccessExpression =
    createPropertyAccess(
      createIdentifier('Object'),
      createIdentifier('defineProperties')
    );

  const callToObjectDefineProperties: ts.CallExpression = createCall(
    propertyAccessExpression,
    [uniqueVariable, propertiesObject]
  );
  return createExpressionStatement(callToObjectDefineProperties);
}
