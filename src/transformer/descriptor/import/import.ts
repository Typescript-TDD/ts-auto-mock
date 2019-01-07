import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { GetTypeChecker } from "../../getTypeChecker";

type importNode = ts.ImportClause | ts.ImportSpecifier;

export function GetImportDescriptor(node: importNode) {
    const typeChecker = GetTypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node.name);
	const type = typeChecker.getDeclaredTypeOfSymbol(symbol);
	return GetDescriptor(type.symbol.declarations[0]);
}