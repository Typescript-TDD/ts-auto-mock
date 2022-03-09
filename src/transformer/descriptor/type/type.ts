import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetCallExpressionType } from '../callExpression/callExpression';
import { TypescriptHelper } from '../helper/helper';
import { GetTypeImport } from './typeImport';

export function GetTypes(
  nodes: ts.NodeArray<ts.Node>,
  scope: Scope
): ts.Node[] {
  let newNodes: ts.Node[] = [];

  nodes.forEach((node: ts.Node) => {
    const type: ts.Node = GetType(node, scope);

    if (core.ts.isUnionTypeNode(type)) {
      const unionTypes: ts.Node[] = GetTypes(type.types, scope);
      newNodes = newNodes.concat(unionTypes);
    } else if (core.ts.isIntersectionTypeNode(type)) {
      const intersectionTypes: ts.Node[] = GetTypes(type.types, scope);

      const hasLiteralOrPrimitive: boolean = intersectionTypes.some(
        (intersectionType: ts.Node) =>
          TypescriptHelper.IsLiteralOrPrimitive(intersectionType)
      );

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
  if (core.ts.isTypeReferenceNode(node)) {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(
      node.typeName
    );

    const type: ts.Node = GetType(declaration, scope);

    // if the type is a reusable and finite (reusable types except for typeAlias)
    // we can return the original node
    // so it can be re used and we handle recursion

    if (
      type.kind === core.ts.SyntaxKind.InterfaceDeclaration ||
      type.kind === core.ts.SyntaxKind.ClassDeclaration ||
      type.kind === core.ts.SyntaxKind.TypeLiteral
    ) {
      return node;
    }

    return type;
  }

  if (core.ts.isThisTypeNode(node)) {
    const declaration: ts.Declaration =
      TypescriptHelper.GetDeclarationFromNode(node);
    return GetType(declaration, scope);
  }

  if (core.ts.isTypeAliasDeclaration(node)) {
    return GetType(node.type, scope);
  }

  if (core.ts.isImportSpecifier(node) || core.ts.isImportClause(node)) {
    const importType: ts.Node = GetTypeImport(node);
    return GetType(importType, scope);
  }

  if (core.ts.isTypeOperatorNode(node)) {
    return GetType(node.type, scope);
  }

  if (core.ts.isParenthesizedTypeNode(node)) {
    return GetType(node.type, scope);
  }

  if (core.ts.isCallExpression(node)) {
    return GetType(GetCallExpressionType(node), scope);
  }

  return node;
}
