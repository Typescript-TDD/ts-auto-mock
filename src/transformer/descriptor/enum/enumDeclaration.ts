import * as ts from 'typescript';

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration, typeChecker: ts.TypeChecker): ts.Expression {
    const type = typeChecker.getTypeAtLocation(node.members[0]) as ts.LiteralType;

	return ts.createLiteral(type.value);
}