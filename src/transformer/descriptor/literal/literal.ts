import * as ts from 'typescript';

export function GetLiteralDescriptor(node: ts.LiteralTypeNode, typeChecker: ts.TypeChecker): ts.Expression {
	const type: ts.Type = typeChecker.getTypeAtLocation(node);
	return ts.createLiteral((type as ts.LiteralType).value);
}