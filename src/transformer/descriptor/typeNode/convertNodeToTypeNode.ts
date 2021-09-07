import type * as ts from 'typescript';
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
  core.ts.SyntaxKind.BigIntKeyword,
  core.ts.SyntaxKind.NumberKeyword,
  core.ts.SyntaxKind.StringKeyword,
  core.ts.SyntaxKind.BooleanKeyword,
  core.ts.SyntaxKind.TrueKeyword,
  core.ts.SyntaxKind.FalseKeyword,
  core.ts.SyntaxKind.ArrayType,
  core.ts.SyntaxKind.UndefinedKeyword,
  core.ts.SyntaxKind.AnyKeyword,
  core.ts.SyntaxKind.NeverKeyword,
  core.ts.SyntaxKind.UnknownKeyword,
  core.ts.SyntaxKind.VoidKeyword,
  core.ts.SyntaxKind.NullKeyword,
];
