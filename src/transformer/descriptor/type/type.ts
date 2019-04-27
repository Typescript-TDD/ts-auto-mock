import * as ts from 'typescript';
import { TypescriptHelper } from '../helper/helper';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';
import { GetTypeImport } from './typeImport';

export function GetTypes(nodes: ts.NodeArray<ts.Node>): ts.Node[] {
    let newNodes: ts.Node[] = [];

    nodes.forEach((node: ts.Node) => {
        const type: ts.Node = GetType(node);

        if (ts.isUnionTypeNode(type)) {
            const unionTypes: ts.Node[] = GetTypes(type.types);
            newNodes = newNodes.concat(unionTypes);
        } else if (ts.isIntersectionTypeNode(type)) {
            const intersectionTypes: ts.Node[] = GetTypes(type.types);

            const hasLiteralOrPrimitive: boolean = intersectionTypes.some((intersectionType: ts.Node) => {
                return TypescriptHelper.IsLiteralOrPrimitive(intersectionType);
            });

            if (!hasLiteralOrPrimitive) {
                newNodes = newNodes.concat(intersectionTypes);
            }
        } else {
            newNodes.push(type);
        }
    });

    return newNodes;
}

export function GetType(node: ts.Node): ts.Node {
    if (ts.isTypeReferenceNode(node)) {
        const identifier: ts.EntityName = node.typeName;
        const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(identifier);
        return GetType(declaration);
    }

    if (ts.isTypeAliasDeclaration(node)) {
        return GetType(node.type);
    }

    if (ts.isImportSpecifier(node) || ts.isImportClause(node)) {
        const importType: ts.Node = GetTypeImport(node);
        return GetType(importType);
    }

    if (ts.isTypeOperatorNode(node)) {
        return GetType(node.type);
    }

    if (ts.isInterfaceDeclaration(node) && IsTypescriptType(node)) {
        return GetTypescriptType(node);
    }

    return node;
}
