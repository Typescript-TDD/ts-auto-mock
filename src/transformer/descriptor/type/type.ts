import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypescriptHelper } from '../helper/helper';
import { GetReturnNodeFromBody } from '../method/bodyReturnType';
import { GetTypeImport } from './typeImport';

export function GetTypes(nodes: ts.NodeArray<ts.Node>, scope: Scope): ts.Node[] {
  let newNodes: ts.Node[] = [];

  nodes.forEach((node: ts.Node) => {
    const type: ts.Node = GetType(node, scope);

    if (ts.isUnionTypeNode(type)) {
      const unionTypes: ts.Node[] = GetTypes(type.types, scope);
      newNodes = newNodes.concat(unionTypes);
    } else if (ts.isIntersectionTypeNode(type)) {
      const intersectionTypes: ts.Node[] = GetTypes(type.types, scope);

      const hasLiteralOrPrimitive: boolean = intersectionTypes.some((intersectionType: ts.Node) => TypescriptHelper.IsLiteralOrPrimitive(intersectionType));

      if (!hasLiteralOrPrimitive) {
        newNodes = newNodes.concat(intersectionTypes);
      }
    } else {
      newNodes.push(type);
    }
  });

  return newNodes;
}

export function GetType(node: ts.Node, scope: Scope): ts.Node {
  if (ts.isTypeReferenceNode(node)) {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);

    return GetType(declaration, scope);
  }

  if (ts.isThisTypeNode(node)) {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node);
    return GetType(declaration, scope);
  }

  if (ts.isTypeAliasDeclaration(node)) {
    return GetType(node.type, scope);
  }

  if (ts.isImportSpecifier(node) || ts.isImportClause(node)) {
    const importType: ts.Node = GetTypeImport(node);
    return GetType(importType, scope);
  }

  if (ts.isTypeOperatorNode(node)) {
    return GetType(node.type, scope);
  }

  if (ts.isParenthesizedTypeNode(node)) {
    return GetType(node.type, scope);
  }

  if (ts.isCallExpression(node)) {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.expression);
    return GetType(GetReturnNodeFromBody(declaration as ts.FunctionDeclaration), scope);
  }

  return node;
}
