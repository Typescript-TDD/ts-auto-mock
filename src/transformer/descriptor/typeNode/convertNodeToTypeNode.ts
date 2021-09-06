import type * as ts from 'typescript';
import { SyntaxKind } from 'typescript';
import { core } from '../../core/core';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetNullDescriptor } from '../null/null';

export function convertNodeToTypeNode(
  node: ts.Node
): ts.TypeNode | ts.Expression {
  const typeChecker: ts.TypeChecker = core.typeChecker;

  const typeAtLocation: ts.Type = typeChecker.getTypeAtLocation(node);

  const typeNode: ts.TypeNode | undefined = typeChecker.typeToTypeNode(
    typeAtLocation,
    undefined,
    undefined
  );

  if (!typeNode) {
    TransformerLogger().typeCannotBeChecked(node);
    return GetNullDescriptor();
  }

  if (!canTypeBeChecked(typeNode)) {
    TransformerLogger().typeCannotBeChecked(node);
    return typeNode;
  }

  return typeNode;
}

const canTypeBeChecked: (type: ts.TypeNode) => boolean = (
  type: ts.TypeNode
): boolean => typesThatCanBeAnalyzed.includes(type.kind);

const typesThatCanBeAnalyzed: ts.SyntaxKind[] = [
  SyntaxKind.NumberKeyword,
  SyntaxKind.StringKeyword,
  SyntaxKind.BooleanKeyword,
  SyntaxKind.ArrayType,
  SyntaxKind.UndefinedKeyword,
];
