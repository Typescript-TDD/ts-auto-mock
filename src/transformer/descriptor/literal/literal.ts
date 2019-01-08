import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetLiteralDescriptor(node: ts.LiteralTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
	const type: ts.Type = typeChecker.getTypeAtLocation(node);
	return ts.createLiteral((type as ts.LiteralType).value);
}