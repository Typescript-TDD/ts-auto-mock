import type * as ts from 'typescript';
import { Identifiers } from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetBooleanTrueDescriptor } from '../boolean/booleanTrue';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import {
  createBinaryExpression,
  createBlock,
  createCall,
  createConditional,
  createElementAccess,
  createExpressionStatement,
  createIdentifier,
  createMethod,
  createObjectLiteral,
  createPropertyAccess,
  createPropertyAssignment,
  createPunctuationToken,
  createReturn,
  createStringLiteral,
} from '../../../typescriptFactory/typescriptFactory';
import { PropertyLike } from './propertyLike';

export interface PropertyAssignments {
  lazy: ts.PropertyAssignment[];
  literals: ts.PropertyAssignment[];
}

export function GetMockPropertiesAssignments(
  properties: PropertyLike[],
  scope: Scope
): PropertyAssignments {
  return properties.reduce(
    (acc: PropertyAssignments, member: PropertyLike): PropertyAssignments => {
      const descriptor: ts.Expression = GetDescriptor(member, scope);

      if (core.ts.isCallLikeExpression(descriptor)) {
        acc.lazy.push(GetLazyMockProperty(descriptor, member));
      } else {
        acc.literals.push(GetLiteralMockProperty(descriptor, member));
      }

      return acc;
    },
    { lazy: [], literals: [] }
  );
}

function GetLiteralMockProperty(
  descriptor: ts.Expression,
  member: PropertyLike
): ts.PropertyAssignment {
  const propertyName: string = TypescriptHelper.GetStringPropertyName(
    member.name
  );

  return createPropertyAssignment(
    createStringLiteral(propertyName),
    descriptor
  );
}

function GetLazyMockProperty(
  descriptor: ts.Expression,
  member: PropertyLike
): ts.PropertyAssignment {
  const propertyName: string = TypescriptHelper.GetStringPropertyName(
    member.name
  );

  const stringPropertyName: ts.StringLiteral = createStringLiteral(
    propertyName
  );
  const variableDeclarationName: ts.ElementAccessExpression = createElementAccess(
    Identifiers.MockIdentifierInternalValues,
    stringPropertyName
  );
  const setVariableParameterName: ts.Identifier =
    Identifiers.MockIdentifierSetParameterName;

  const expressionGetAssignment: ts.BinaryExpression = createBinaryExpression(
    variableDeclarationName,
    core.ts.SyntaxKind.EqualsToken,
    descriptor
  );

  const hasOwnProperty: ts.Expression = createCall(
    createPropertyAccess(
      Identifiers.MockIdentifierInternalValues,
      'hasOwnProperty'
    ),
    [stringPropertyName]
  );

  const getExpressionBody: ts.Expression = createConditional(
    hasOwnProperty,
    createPunctuationToken(core.ts.SyntaxKind.QuestionToken),
    variableDeclarationName,
    createPunctuationToken(core.ts.SyntaxKind.ColonToken),
    expressionGetAssignment
  );
  const setExpressionBody: ts.BinaryExpression = createBinaryExpression(
    variableDeclarationName,
    core.ts.SyntaxKind.EqualsToken,
    setVariableParameterName
  );

  const returnGetStatement: ts.ReturnStatement = createReturn(
    getExpressionBody
  );
  const getBody: ts.Block = createBlock([returnGetStatement]);

  const returnSetStatement: ts.Statement = createExpressionStatement(
    setExpressionBody
  );
  const setBody: ts.Block = createBlock([returnSetStatement]);

  const get: ts.MethodDeclaration = createMethod('get', getBody, []);
  const set: ts.MethodDeclaration = createMethod('set', setBody, [
    setVariableParameterName,
  ]);
  const literal: ts.ObjectLiteralExpression = createObjectLiteral([
    get,
    set,
    createPropertyAssignment(
      createIdentifier('enumerable'),
      GetBooleanTrueDescriptor()
    ),
  ]);

  return createPropertyAssignment(createStringLiteral(propertyName), literal);
}
