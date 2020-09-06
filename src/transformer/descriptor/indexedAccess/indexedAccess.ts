import * as ts from 'typescript';
import { TransformerLogger } from '../../logger/transformerLogger';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';
import { PropertySignatureCache } from '../property/cache';

export function GetIndexedAccessTypeDescriptor(
  node: ts.IndexedAccessTypeNode,
  scope: Scope
): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  let propertyName: string | null = null;

  switch (node.indexType.kind) {
    case ts.SyntaxKind.TypeReference:
      const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(
        (node.indexType as ts.TypeReferenceNode).typeName
      );

      switch (declaration.kind) {
        case ts.SyntaxKind.TypeParameter:
          const propertyNameIdentifier: ts.PropertyName = PropertySignatureCache.instance.get();
          propertyName = (propertyNameIdentifier as ts.Identifier)
            .escapedText as string;
          break;
        case ts.SyntaxKind.TypeAliasDeclaration:
          propertyName = (((declaration as ts.TypeAliasDeclaration)
            .type as ts.LiteralTypeNode).literal as ts.StringLiteral).text;
          break;
        default:
          TransformerLogger().typeNotSupported(
            'IndexedAccess of TypeReference of ' +
              ts.SyntaxKind[declaration.kind],
            declaration
          );
          break;
      }
      break;
    case ts.SyntaxKind.LiteralType:
      propertyName = ((node.indexType as ts.LiteralTypeNode)
        .literal as ts.StringLiteral).text;
      break;
    default:
      TransformerLogger().typeNotSupported(
        'IndexedAccess of ' + ts.SyntaxKind[node.indexType.kind],
        node.indexType
      );
      break;
  }

  if (propertyName !== null) {
    const propertySymbol: ts.Symbol | undefined = typeChecker.getPropertyOfType(
      typeChecker.getTypeFromTypeNode(node.objectType),
      propertyName
    );

    if (!propertySymbol) {
      // FIXME: Currently not all IndexedAccessType transformation are supported.
      // See https://github.com/Typescript-TDD/ts-auto-mock/issues/201 for more details.
      TransformerLogger().indexedAccessTypeFailed(propertyName, node.getText());
      return GetNullDescriptor();
    }

    return GetDescriptor(
      TypescriptHelper.GetDeclarationFromSymbol(propertySymbol),
      scope
    );
  }

  return GetNullDescriptor();
}
