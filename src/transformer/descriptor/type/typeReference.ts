import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    const typeChecker = TypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node.typeName);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration);
}