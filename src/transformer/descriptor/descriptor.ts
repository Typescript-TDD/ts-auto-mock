import * as ts from 'typescript';
import { GetStringDescriptor } from "./string/stringDescriptor";
import { GetInterfaceDeclarationDescriptor } from "./interface/declaration/interfaceDeclaration";
import { GetTypeReferenceDescriptor } from "./type/typeReference";
import { GetPropertySignatureDescriptor } from "./property/propertySignature";
import { GetNumberDescriptor } from "./number/number";
import { GetBooleanDescriptor } from "./boolean/boolean";

export function GetDescriptor(node: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
	switch (node.kind) {
		case ts.SyntaxKind.TypeAliasDeclaration:
			return GetDescriptor((node as ts.TypeAliasDeclaration).type, typeChecker);
		case ts.SyntaxKind.TypeReference:
			return GetTypeReferenceDescriptor(node as ts.TypeReferenceNode, typeChecker);
		case ts.SyntaxKind.TypeLiteral:
		case ts.SyntaxKind.InterfaceDeclaration:
			return GetInterfaceDeclarationDescriptor(node as ts.InterfaceDeclaration, typeChecker);
		case ts.SyntaxKind.PropertySignature:
			return GetPropertySignatureDescriptor(node as ts.PropertySignature, typeChecker);
		case ts.SyntaxKind.StringKeyword:
			return GetStringDescriptor();
		case ts.SyntaxKind.NumberKeyword:
			return GetNumberDescriptor();
		case ts.SyntaxKind.BooleanKeyword:
			return GetBooleanDescriptor();
		default:
			return ts.createLiteral("NOT IMPLEMENTED" + ts.SyntaxKind[node.kind]);
	}
}