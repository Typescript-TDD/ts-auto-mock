import ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { MockIdentifierInternalValues, MockIdentifierObjectReturnValue } from '../../mockIdentifier/mockIdentifier';
import { GetMethodDescriptor } from '../method/method';
import { GetMockMarkerProperty, Property } from './mockMarker';
import { PropertyAssignments } from './mockPropertiesAssignments';

export function GetMockCall(properties: PropertyAssignments, signatures: ReadonlyArray<ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration>, scope: Scope): ts.CallExpression {
  const mockObjectReturnValueName: ts.Identifier = MockIdentifierObjectReturnValue;

  const variableStatements: ts.VariableDeclaration[] = [
    TypescriptCreator.createVariableDeclaration(MockIdentifierInternalValues, ts.createObjectLiteral()),
  ];
  const propertyAssignmentStatements: ts.ExpressionStatement[] = [];

  const isCallable: boolean = !!signatures.length;
  if (isCallable) {
    // FIXME: It'd probably be wise to extract the name of the callable
    // signature and only fallback to `new` if there is none (or something
    // shorter).
    const callableEntry: ts.CallExpression = GetMethodDescriptor(ts.createStringLiteral('new'), signatures, scope);

    variableStatements.push(
      TypescriptCreator.createVariableDeclaration(mockObjectReturnValueName, callableEntry),
    );

    propertyAssignmentStatements.push(
      ...properties.literals.map(
        (literalProperty: ts.PropertyAssignment) => AssignLiteralPropertyTo(mockObjectReturnValueName, literalProperty)
      ),
    );
  } else {
    variableStatements.push(
      TypescriptCreator.createVariableDeclaration(mockObjectReturnValueName, ts.createObjectLiteral(properties.literals)),
    );
  }

  const statements: ts.Statement[] = [
    TypescriptCreator.createVariableStatement(variableStatements),
    ...propertyAssignmentStatements,
  ];

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
