import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';

type importNode = ts.ImportClause | ts.ImportSpecifier;

export function GetImportDescriptor(node: importNode, typeChecker: ts.TypeChecker) {
	const symbol = typeChecker.getSymbolAtLocation(node.name);
	const type = typeChecker.getDeclaredTypeOfSymbol(symbol);
	return GetDescriptor(type.symbol.declarations[0], typeChecker);
}