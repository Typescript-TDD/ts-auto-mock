import * as ts from 'typescript';
import { GetStringDescriptor } from "./string/string";
import { GetInterfaceDeclarationDescriptor } from "./interface/declaration/interfaceDeclaration";
import { GetTypeReferenceDescriptor } from "./type/typeReference";
import { GetPropertyDescriptor } from "./property/propertySignature";
import { GetNumberDescriptor } from "./number/number";
import { GetBooleanDescriptor } from "./boolean/boolean";
import { GetNullDescriptor } from "./null/null";
import { GetLiteralDescriptor } from "./literal/literal";
import { GetImportDescriptor } from "./import/import";
import { GetClassDeclarationDescriptor } from "./class/classDeclaration";
import { GetArrayDescriptor } from "./array/array";

export function GetDescriptor(node: ts.Node, typeChecker: ts.TypeChecker): ts.Expression {
	switch (node.kind) {
		case ts.SyntaxKind.TypeAliasDeclaration:
			return GetDescriptor((node as ts.TypeAliasDeclaration).type, typeChecker);
		case ts.SyntaxKind.TypeReference:
			return GetTypeReferenceDescriptor(node as ts.TypeReferenceNode, typeChecker);
		case ts.SyntaxKind.TypeLiteral:
		case ts.SyntaxKind.InterfaceDeclaration:
			return GetInterfaceDeclarationDescriptor(node as ts.InterfaceDeclaration, typeChecker);
		case ts.SyntaxKind.ClassDeclaration:
			return GetClassDeclarationDescriptor(node as ts.ClassDeclaration, typeChecker);
		case ts.SyntaxKind.PropertySignature:
			return GetPropertyDescriptor(node as ts.PropertySignature, typeChecker);
		case ts.SyntaxKind.PropertyDeclaration:
			return GetPropertyDescriptor(node as ts.PropertyDeclaration, typeChecker);
		case ts.SyntaxKind.LiteralType:
			return GetLiteralDescriptor(node as ts.LiteralTypeNode, typeChecker);
		case ts.SyntaxKind.ImportSpecifier:
			return GetImportDescriptor(node as ts.ImportSpecifier, typeChecker);
		case ts.SyntaxKind.ImportClause:
			return GetImportDescriptor(node as ts.ImportClause, typeChecker);
		case ts.SyntaxKind.ArrayType:
			return GetArrayDescriptor();
		case ts.SyntaxKind.StringKeyword:
			return GetStringDescriptor();
		case ts.SyntaxKind.NumberKeyword:
			return GetNumberDescriptor();
		case ts.SyntaxKind.BooleanKeyword:
			return GetBooleanDescriptor();
		case ts.SyntaxKind.NullKeyword:
		case ts.SyntaxKind.AnyKeyword:
		case ts.SyntaxKind.UnknownKeyword:
		case ts.SyntaxKind.UndefinedKeyword:
			return GetNullDescriptor();
		default:
			console.log("NOT IMPLEMENTED "+ ts.SyntaxKind[node.kind]);
			return ts.createLiteral("NOT IMPLEMENTED" + ts.SyntaxKind[node.kind]);
	}
}