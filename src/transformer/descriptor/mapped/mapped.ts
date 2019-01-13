import * as ts from 'typescript';
import { GetTypes } from "../type/type";
import { GetMockPropertiesFromDeclarations } from "../mock/mockProperties";

export function GetMappedDescriptor(node: ts.MappedTypeNode): ts.Expression {
	const typeParameter = node.typeParameter.constraint;
	const types = GetTypes(ts.createNodeArray([typeParameter]));
	
	const propertiesName = types.map((stringType: ts.Node) => {
		const literal = stringType as ts.LiteralTypeNode;
		return (literal.literal as ts.StringLiteral).text;
	});
	
	const properties = propertiesName.map((name: string) => {
		return ts.createProperty([], [], name, undefined, node.type, undefined);
	});
	
	return GetMockPropertiesFromDeclarations(properties);
}