import * as ts from 'typescript';

export function GetStringDescriptor(): ts.Expression {
	return ts.createLiteral("");
}