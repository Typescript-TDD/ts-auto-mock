import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

type importNode = ts.ImportClause | ts.ImportSpecifier;

export function GetImportDescriptor(node: importNode) {
    const typeChecker = TypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node.name);
	const type = typeChecker.getDeclaredTypeOfSymbol(symbol);
	return GetDescriptor(type.symbol.declarations[0]);
}