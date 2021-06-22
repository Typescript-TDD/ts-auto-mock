import type * as ts from 'typescript';
import { core } from '../../core/core';

export type PropertyLike =
  | ts.PropertyDeclaration
  | ts.PropertySignature
  | ts.MethodSignature;

export function isPropertyLike(prop: ts.Node): prop is PropertyLike {
  return (
    prop.kind === core.ts.SyntaxKind.PropertyDeclaration ||
    prop.kind === core.ts.SyntaxKind.PropertySignature ||
    prop.kind === core.ts.SyntaxKind.MethodSignature
  );
}
