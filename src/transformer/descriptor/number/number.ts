import * as ts from 'typescript';

export function GetNumberDescriptor(): ts.Expression {
	return ts.createLiteral(0);
}