import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockIdentifierInternalValues, MockIdentifierSetParameterName } from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { PropertyLike } from './propertyLike';

export function GetMockProperty(member: PropertyLike, scope: Scope): ts.PropertyAssignment {
    const descriptor: ts.Expression = GetDescriptor(member, scope);

    const propertyName: string = TypescriptHelper.GetStringPropertyName(member.name);

    const variableDeclarationName: ts.ElementAccessExpression = ts.createElementAccess(MockIdentifierInternalValues, ts.createStringLiteral(propertyName));
    const setVariableParameterName: ts.Identifier = MockIdentifierSetParameterName;

    const expressionGetAssignment: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, descriptor);

    const getExpressionBody: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.BarBarToken, expressionGetAssignment);
    const setExpressionBody: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, setVariableParameterName);

    const returnGetStatement: ts.ReturnStatement = ts.createReturn(getExpressionBody);
    const getBody: ts.Block = ts.createBlock([returnGetStatement]);

    const returnSetStatement: ts.Statement = ts.createExpressionStatement(setExpressionBody);
    const setBody: ts.Block = ts.createBlock([returnSetStatement]);

    const get: ts.MethodDeclaration = TypescriptCreator.createMethod('get', getBody, []);
    const set: ts.MethodDeclaration = TypescriptCreator.createMethod('set', setBody, [setVariableParameterName]);
    const literal: ts.ObjectLiteralExpression = ts.createObjectLiteral([get, set, ts.createPropertyAssignment(
        ts.createIdentifier('enumerable'),
        ts.createTrue(),
    )]);

    return ts.createPropertyAssignment(ts.createStringLiteral(propertyName), literal);
}
