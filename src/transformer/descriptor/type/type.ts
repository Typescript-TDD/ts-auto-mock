import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetTypeImport } from "./typeImport";

export function GetType(node: ts.Node): ts.Node {
	const typeChecker = TypeChecker();
	
	if (ts.isTypeReferenceNode(node)) {
		const identifier: ts.EntityName = (node as ts.TypeReferenceNode).typeName;
		const symbol = typeChecker.getSymbolAtLocation(identifier);
		const declaration = symbol.declarations[0];
		return GetType(declaration);
	}
	
	if (ts.isTypeAliasDeclaration(node)) {
		const typeCast = node as ts.TypeAliasDeclaration;
		return GetType(typeCast.type);
	}
	
	if (ts.isImportSpecifier(node)) {
		const importType = GetTypeImport(node);
		return GetType(importType);
	}
	
	return node;
}