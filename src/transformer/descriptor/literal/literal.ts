import * as ts from 'typescript';
import { GetTypeChecker } from "../../getTypeChecker";

export function GetLiteralDescriptor(node: ts.LiteralTypeNode): ts.Expression {
    const typeChecker = GetTypeChecker();
	const type: ts.Type = typeChecker.getTypeAtLocation(node);
	return ts.createLiteral((type as ts.LiteralType).value);
}