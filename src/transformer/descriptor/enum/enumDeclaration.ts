import * as ts from 'typescript';
import { GetTypeChecker } from "../../getTypeChecker";

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration): ts.Expression {
    const typeChecker = GetTypeChecker();
    const type = typeChecker.getTypeAtLocation(node.members[0]) as ts.LiteralType;

	return ts.createLiteral(type.value);
}