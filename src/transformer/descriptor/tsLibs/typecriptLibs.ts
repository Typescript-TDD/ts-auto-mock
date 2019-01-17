import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypescriptLibsTypes, TypescriptLibsTypesFolder } from "./typescriptLibsTypes";
import { TypescriptLibsTypeAdapter } from "./typescriptLibsTypeAdapter";

export function IsTypescriptType(node: ts.Node): boolean {
	const fileName = node.getSourceFile().fileName;
	
	return fileName.includes(TypescriptLibsTypesFolder);
}

export function GetTypescriptType(node: ts.Node): ts.Node {
    const type = TypeChecker().getTypeAtLocation(node);

    return TypescriptLibsTypeAdapter(TypescriptLibsTypes[type.symbol.name])
}