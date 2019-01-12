import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";

export function GetLiteralDescriptor(node: ts.LiteralTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
	const type: ts.Type = typeChecker.getTypeAtLocation(node);
	
	const literalType = type as ts.LiteralType;
	
	if (literalType.value) {
		return ts.createLiteral((type as ts.LiteralType).value);
	} else {
		return GetDescriptor(node.literal);
	}
	
}