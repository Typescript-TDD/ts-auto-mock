import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { GetNullDescriptor } from "../null/null";
import { PropertySignatureCache } from "../property/cache";
import { GetMethodDescriptor } from "./method";

type functionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(node: functionAssignment): ts.Expression {
	const property: ts.PropertyName = PropertySignatureCache.instance.get();
	let returnValue;
	
	const functionBody = node.body as ts.FunctionBody;
	
	if (functionBody.statements) {
		const returnStatement: ts.ReturnStatement = GetReturnStatement(functionBody);
		
		if (returnStatement) {
			returnValue  = GetDescriptor(returnStatement.expression);
		} else {
			returnValue =  GetNullDescriptor();
		}
		
		return GetMethodDescriptor(property, returnValue);
	} else {
		returnValue = GetDescriptor(node.body);
	}
	
	return GetMethodDescriptor(property, returnValue);
}

function GetReturnStatement(body: ts.FunctionBody): ts.ReturnStatement {
	return body.statements.find((statement: ts.Statement) => {
		return statement.kind === ts.SyntaxKind.ReturnStatement
	}) as ts.ReturnStatement
}