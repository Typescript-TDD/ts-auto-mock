import * as ts from 'typescript';
import { GetTypes } from "../type/type";
import { GetMockPropertiesFromDeclarations } from "../mock/mockProperties";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypescriptHelper } from "../helper/helper";

export function GetMappedDescriptor(node: ts.MappedTypeNode): ts.Expression {
	const typeParameter = node.typeParameter.constraint;
	const typeChecker = TypeChecker();
	const types = GetTypes(ts.createNodeArray([typeParameter]));
	
	const properties = types.reduce((acc: Array<ts.PropertyDeclaration>, possibleType: ts.Node) => {
		if (ts.isLiteralTypeNode(possibleType)) {
			const literal = possibleType as ts.LiteralTypeNode;
			const property = TypescriptHelper.createProperty((literal.literal as ts.StringLiteral).text, node.type);
			acc.push(property);
			return acc;
		} else {
			const type = typeChecker.getTypeAtLocation(possibleType);
			const properties = typeChecker.getPropertiesOfType(type).map((symbol: ts.Symbol) => {
				return TypescriptHelper.createProperty(symbol.name, node.type);
			});
			
			acc = acc.concat(properties);
			
			return acc;
		}
	}, []);
	
	return GetMockPropertiesFromDeclarations(properties);
}