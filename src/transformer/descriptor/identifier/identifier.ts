import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { GetTypeChecker } from "../../getTypeChecker";

export function GetIdentifierDescriptor(node: ts.Identifier): ts.Expression {
	const typeChecker = GetTypeChecker();
	const type = typeChecker.getSymbolAtLocation(node);
	return GetDescriptor(type.declarations[0]);
}
