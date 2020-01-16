import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockIdentifierInternalValues, MockIdentifierSetParameterName } from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { GetBooleanTrueDescriptor } from '../boolean/booleanTrue';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { PropertyLike } from './propertyLike';

export interface PropertyAssignments {
    lazy: ts.PropertyAssignment[];
    literals: ts.PropertyAssignment[];
}

export function GetMockPropertiesAssignments(properties: PropertyLike[], scope: Scope): PropertyAssignments {
    return properties.reduce(
        (acc: PropertyAssignments, member: PropertyLike): PropertyAssignments => {
            const descriptor: ts.Expression = GetDescriptor(member, scope);

            if (descriptor.kind === ts.SyntaxKind.VoidExpression) {
                return acc;
            }

            if (ts.isCallLikeExpression(descriptor)) {
                acc.lazy.push(GetLazyMockProperty(descriptor, member));
            } else {
                acc.literals.push(GetLiteralMockProperty(descriptor, member));
            }

            return acc;
        },
        { lazy: [], literals: []},
    );
}

function GetLiteralMockProperty(descriptor: ts.Expression, member: PropertyLike): ts.PropertyAssignment {
    const propertyName: string = TypescriptHelper.GetStringPropertyName(member.name);

    return ts.createPropertyAssignment(ts.createStringLiteral(propertyName), descriptor);
}

function GetLazyMockProperty(descriptor: ts.Expression, member: PropertyLike): ts.PropertyAssignment {
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
        GetBooleanTrueDescriptor(),
    )]);

    return ts.createPropertyAssignment(ts.createStringLiteral(propertyName), literal);
}
