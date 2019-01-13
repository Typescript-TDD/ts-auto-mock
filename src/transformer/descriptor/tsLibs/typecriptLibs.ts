import * as ts from 'typescript';
import { TypescriptLibsTypesAdapter } from "./typescriptLibsTypesAdapter";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypescriptLibsTypes, TypescriptLibsTypesFolder } from "./typescriptLibsTypes";

export function IsTypescriptType(node: ts.Node): boolean {
	const fileName = node.getSourceFile().fileName;
	
	return fileName.includes(TypescriptLibsTypesFolder);
}

export function GetTypescriptTypeDescriptor(node: ts.Node): ts.Expression {
	const type = TypeChecker().getTypeAtLocation(node);
	
	return TypescriptLibsTypesAdapter(TypescriptLibsTypes[type.symbol.name])
}