import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { MockDefiner } from "../../mockDefiner/mockDefiner";
import { TypescriptHelper } from "../../helper/helper";

export function GetMethodDescriptor(propertyName: ts.PropertyName, node: ts.SignatureDeclaration): ts.Expression {
    const returnValue: ts.Expression = GetDescriptor(node.type);

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