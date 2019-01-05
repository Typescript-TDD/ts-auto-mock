import * as ts from 'typescript';

export function GetBooleanDescriptor() {
	return ts.createLiteral(false);
}