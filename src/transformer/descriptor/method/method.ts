import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { GetMethodExpression } from "./methodExpression";

type Method = ts.MethodDeclaration | ts.MethodSignature | ts.FunctionTypeNode;

export function GetMethodDescriptor(node: Method): ts.Expression {
	const returnValue: ts.Expression = GetDescriptor(node.type);
	const returnStatement: ts.ReturnStatement = ts.createReturn(returnValue);
	const body = ts.createBlock([returnStatement]);
	return GetMethodExpression(body);
}