import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { GetTypeChecker } from "../../getTypeChecker";

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    const typeChecker = GetTypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node.typeName);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration);
}