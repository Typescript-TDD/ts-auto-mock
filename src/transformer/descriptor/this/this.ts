import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetThisDescriptor(node: ts.ThisTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
	const symbol = typeChecker.getSymbolAtLocation(node);
	const declaration = symbol.declarations[0];
	return GetDescriptor(declaration);
}