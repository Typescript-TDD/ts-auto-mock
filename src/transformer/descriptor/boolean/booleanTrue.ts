import * as ts from 'typescript';

export function GetBooleanTrueDescriptor(): ts.Expression {
	return ts.createLiteral(true);
}