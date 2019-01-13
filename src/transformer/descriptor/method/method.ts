import * as ts from 'typescript';
import { MockDefiner } from "../../mockDefiner/mockDefiner";
import { TypescriptHelper } from "../helper/helper";

export function GetMethodDescriptor(propertyName: ts.PropertyName, returnValue: ts.Expression): ts.Expression {
    const statementFactory = ts.createPropertyAccess(
        ts.createPropertyAccess(
            ts.createPropertyAccess(
                MockDefiner.instance.currentTsAutoMockImportName,
                ts.createIdentifier('MockFactory')
            ),
            ts.createIdentifier('instance')),
        ts.createIdentifier("getFactory"));

    const propertyNameString = ts.createStringLiteral("" + (propertyName as ts.Identifier).escapedText);
    const callToFactory = ts.createCall(statementFactory, [], [propertyNameString, returnValue]);

    const returnMockFactory = ts.createReturn(callToFactory);

    const block = ts.createBlock([returnMockFactory]);
    const functionExpression = TypescriptHelper.createFunctionExpression(block);

    const parenthesizedExpression = ts.createParen(functionExpression);
    return ts.createCall(parenthesizedExpression, [], []);
}

export function GetEmptyMethodDescriptor() {
	const property = ts.createIdentifier("");
	const returnValue = ts.createIdentifier("");
	return GetMethodDescriptor(property, returnValue);
}