import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { TypescriptHelper } from '../helper/helper';

export function GetMethodDescriptor(propertyName: ts.PropertyName, returnValue: ts.Expression): ts.Expression {
    const statementFactory: ts.PropertyAccessExpression = ts.createPropertyAccess(
        ts.createPropertyAccess(
            ts.createPropertyAccess(
                MockDefiner.instance.currentProviderImportName,
                ts.createIdentifier('Provider'),
            ),
            ts.createIdentifier('instance')),
        ts.createIdentifier('getMethod'));

    const propertyNameString: ts.StringLiteral = ts.createStringLiteral('' + (propertyName as ts.Identifier).escapedText);
    const callToFactory: ts.CallExpression = ts.createCall(statementFactory, [], [propertyNameString, returnValue]);

    const returnMockFactory: ts.ReturnStatement = ts.createReturn(callToFactory);

    const block: ts.Block = ts.createBlock([returnMockFactory]);
    const functionExpression: ts.FunctionExpression = TypescriptHelper.createFunctionExpression(block);

    const parenthesizedExpression: ts.ParenthesizedExpression = ts.createParen(functionExpression);
    return ts.createCall(parenthesizedExpression, [], []);
}
