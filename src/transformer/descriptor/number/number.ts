import * as ts from 'typescript';

export function GetNumberDescriptor() {
	return ts.createLiteral(0);
}