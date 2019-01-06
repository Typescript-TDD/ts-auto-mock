import * as ts from 'typescript';

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration): ts.Expression {
	return ts.createPropertyAccess(node.name, node.members[0].name as ts.Identifier);
}