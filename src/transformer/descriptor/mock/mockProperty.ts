import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetDescriptor } from "../descriptor";
import { GetMockDeclarationName, GetMockSetParameterName } from './mockDeclarationName';

export function GetMockProperty(member: ts.PropertyDeclaration): Array<ts.GetAccessorDeclaration | ts.SetAccessorDeclaration> {
	const descriptor: ts.Expression = GetDescriptor(member);
	
	const propertyName = member.name as ts.Identifier;
	const variableDeclarationName = GetMockDeclarationName(propertyName);
	const setVariableParameterName = GetMockSetParameterName(propertyName);

    const expressionGetAssignment = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, descriptor);
    
	const getExpressionBody = ts.createBinary(variableDeclarationName, ts.SyntaxKind.BarBarToken, expressionGetAssignment);
	const setExpressionBody = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, setVariableParameterName);

	const returnGetStatement: ts.ReturnStatement = ts.createReturn(getExpressionBody);
	const getBody: ts.Block = ts.createBlock([returnGetStatement]);

	const returnSetStatement: ts.Statement = ts.createExpressionStatement(setExpressionBody);
    const setBody: ts.Block = ts.createBlock([returnSetStatement]);

	const getAccessor = TypescriptHelper.createGetAccessor(propertyName, getBody);
	const setAccessor = TypescriptHelper.createSetAccessor(propertyName, setBody, setVariableParameterName);
	return [getAccessor, setAccessor]
}