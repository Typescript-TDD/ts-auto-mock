import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode, typeChecker: ts.TypeChecker): ts.Expression {
	const symbol = typeChecker.getSymbolAtLocation(node.typeName);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration, typeChecker);
}