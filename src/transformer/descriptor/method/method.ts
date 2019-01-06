import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';

type Method = ts.MethodDeclaration | ts.MethodSignature;

export function GetMethodDescriptor(node: Method, typeChecker: ts.TypeChecker): ts.Expression {
	const returnValue: ts.Expression = GetDescriptor(node.type, typeChecker);
	const returnStatement: ts.ReturnStatement = ts.createReturn(returnValue);
	const body = ts.createBlock([returnStatement]);
	return ts.createFunctionExpression([], null, undefined, [], [], undefined, body);
}