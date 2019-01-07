import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';

export function GetThisDescriptor(node: ts.ThisTypeNode, typeChecker: ts.TypeChecker): ts.Expression {
	const symbol = typeChecker.getSymbolAtLocation(node);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration, typeChecker);
}