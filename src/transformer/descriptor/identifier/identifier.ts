import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetIdentifierDescriptor(node: ts.Identifier): ts.Expression {
	const typeChecker = TypeChecker();
	const type = typeChecker.getSymbolAtLocation(node);
	return GetDescriptor(type.declarations[0]);
}
