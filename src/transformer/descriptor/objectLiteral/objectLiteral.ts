import * as ts from 'typescript';
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetObjectLiteralDescriptor(node: ts.ObjectLiteralExpression): ts.Expression {
	const typeChecker = TypeChecker();
	const type = typeChecker.getTypeAtLocation(node);
	const symbols = TypeChecker().getPropertiesOfType(type);
	
	return GetMockPropertiesFromSymbol(symbols);
}