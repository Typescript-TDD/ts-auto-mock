import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { MockDefiner } from "../../mockDefiner/mockDefiner";
import { TypescriptHelper } from "../../helper/helper";

type Method = ts.MethodDeclaration | ts.MethodSignature | ts.FunctionTypeNode;

export function GetMethodDescriptor(node: Method): ts.Expression {
    const returnValue: ts.Expression = GetDescriptor(node.type);

    const statementFactory = ts.createPropertyAccess(
        ts.createPropertyAccess(
            ts.createPropertyAccess(
                MockDefiner.instance.currentTsAutoMockImportName,
                ts.createIdentifier('MockFactory')
            ),
            ts.createIdentifier('instance')),
        ts.createIdentifier("getFactory"));

    const returnMockFactory = ts.createReturn(ts.createCall(statementFactory, [], [returnValue]));

    const block = ts.createBlock([returnMockFactory]);
    const functionExpression = TypescriptHelper.createFunctionExpression(block);

    const parenthesizedExpression = ts.createParen(functionExpression);
    return ts.createCall(parenthesizedExpression, [], []);
}