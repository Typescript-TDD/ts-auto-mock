import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
export type ImportNode = ts.ImportClause | ts.ImportSpecifier;
export function GetTypeImport(node: ImportNode): ts.Node {
	const typeChecker = TypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node.name);
	const declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
	
	if (declaredType.symbol) {
		return declaredType.symbol.declarations[0];
	} else {
		return typeChecker.typeToTypeNode(declaredType);
	}
}