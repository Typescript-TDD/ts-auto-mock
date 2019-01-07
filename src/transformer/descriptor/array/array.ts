import * as ts from 'typescript';

export function GetArrayDescriptor(): ts.Expression {
	return ts.createArrayLiteral();
}