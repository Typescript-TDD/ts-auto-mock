import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { GetUndefinedDescriptor } from "../undefined/undefined";
import { GetTypes } from "../type/type";

export function GetUnionDescriptor(node: ts.UnionTypeNode): ts.Expression {
	const findNodes = GetTypes(node.types);

	const notDefinedType = findNodes.filter((typeNode: ts.TypeNode) => {
		return isNotDefinedType(typeNode);
	});
	
	if (notDefinedType.length) {
		return GetUndefinedDescriptor();
	}
	
	return GetDescriptor(node.types[0]);
}

function isNotDefinedType(typeNode: ts.Node) {
	return typeNode.kind === ts.SyntaxKind.VoidKeyword
	|| typeNode.kind === ts.SyntaxKind.NullKeyword
	|| typeNode.kind === ts.SyntaxKind.UnknownKeyword
	|| typeNode.kind === ts.SyntaxKind.UndefinedKeyword
}
