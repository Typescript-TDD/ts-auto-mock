import type * as ts from 'typescript';
import { TransformerLogger } from '../../logger/transformerLogger';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';
import { PropertySignatureCache } from '../property/cache';

export function GetIndexedAccessTypeDescriptor(
  node: ts.IndexedAccessTypeNode,
  scope: Scope
): ts.Expression {
  let propertyName: string | null = null;

  switch (node.indexType.kind) {
    case core.ts.SyntaxKind.TypeReference:
      const declaration: ts.Declaration =
        TypescriptHelper.GetDeclarationFromNode(
          (node.indexType as ts.TypeReferenceNode).typeName
        );

      switch (declaration.kind) {
        case core.ts.SyntaxKind.TypeParameter:
          const propertyNameIdentifier: ts.PropertyName =
            PropertySignatureCache.instance.get();
          propertyName = TypescriptHelper.GetStringPropertyName(
            propertyNameIdentifier
          );
          break;
        case core.ts.SyntaxKind.TypeAliasDeclaration:
          propertyName = (
            (
              (declaration as ts.TypeAliasDeclaration)
                .type as ts.LiteralTypeNode
            ).literal as ts.StringLiteral
          ).text;
          break;
        default:
          TransformerLogger().typeNotSupported(
            `IndexedAccess of TypeReference of ${
              core.ts.SyntaxKind[declaration.kind]
            }`,
            declaration
          );
          break;
      }
      break;
    case core.ts.SyntaxKind.LiteralType:
      propertyName = (
        (node.indexType as ts.LiteralTypeNode).literal as ts.StringLiteral
      ).text;
      break;
    default:
      TransformerLogger().typeNotSupported(
        `IndexedAccess of ${core.ts.SyntaxKind[node.indexType.kind]}`,
        node.indexType
      );
      break;
  }

  if (propertyName !== null) {
    const propertySymbol: ts.Symbol | undefined =
      core.typeChecker.getPropertyOfType(
        core.typeChecker.getTypeFromTypeNode(node.objectType),
        propertyName
      );

    if (!propertySymbol) {
      // FIXME: Currently not all IndexedAccessType transformation are supported.
      // See https://github.com/Typescript-TDD/ts-auto-mock/issues/201 for more details.
      TransformerLogger().indexedAccessTypeFailed(
        propertyName,
        node.getText(),
        node
      );
      return GetNullDescriptor();
    }

    return GetDescriptor(
      TypescriptHelper.GetDeclarationFromSymbol(propertySymbol),
      scope
    );
  }

  return GetNullDescriptor();
}
