import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { GetTypeChecker } from "../../getTypeChecker";

export function GetThisDescriptor(node: ts.ThisTypeNode): ts.Expression {
    const typeChecker = GetTypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration);
}