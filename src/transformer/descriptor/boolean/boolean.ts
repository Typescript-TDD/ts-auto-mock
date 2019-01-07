import * as ts from 'typescript';

export function GetBooleanDescriptor(): ts.Expression {
	return ts.createLiteral(false);
}