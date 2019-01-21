import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetTypeImport } from "./typeImport";
import { TypescriptHelper } from "../helper/helper";
import { GetTypescriptType, IsTypescriptType } from "../tsLibs/typecriptLibs";

export function GetTypes(nodes: ts.NodeArray<ts.Node>): Array<ts.Node> {
	let newNodes = [];
	
	nodes.forEach((node: ts.Node) => {
		let type = GetType(node);
		
		if (ts.isUnionTypeNode(type)) {
			const unionTypes = GetTypes(type.types);
			newNodes = newNodes.concat(unionTypes);
		} else if (ts.isIntersectionTypeNode(type)) {
			const intersectionType = GetTypes(type.types);
			
			const hasLiteralOrPrimitive = intersectionType.some((type: ts.Node) => {
				return TypescriptHelper.IsLiteralOrPrimitive(type)
			});
			
			if (!hasLiteralOrPrimitive) {
				newNodes = newNodes.concat(intersectionType);
			}
		} else {
			newNodes.push(type);
		}
	});
	
	return newNodes;
}

export function GetType(node: ts.Node): ts.Node {
	const typeChecker = TypeChecker();
	
	if (ts.isTypeReferenceNode(node)) {
		const identifier: ts.EntityName = (node as ts.TypeReferenceNode).typeName;		
		const declaration = TypescriptHelper.GetDeclarationFromNode(identifier);
		return GetType(declaration);
	}
	
	if (ts.isTypeAliasDeclaration(node)) {
		const typeCast = node as ts.TypeAliasDeclaration;
		return GetType(typeCast.type);
	}
	
	if (ts.isImportSpecifier(node) || ts.isImportClause(node)) {
		const importType = GetTypeImport(node);
		return GetType(importType);
	}
	
	if (ts.isTypeOperatorNode(node)) {
		const operatorNodeType = (node as ts.TypeOperatorNode).type;
		return GetType(operatorNodeType);
	}

	if (ts.isInterfaceDeclaration(node) && IsTypescriptType(node)) {
	    return GetTypescriptType(node);
    }
	
	return node;
}