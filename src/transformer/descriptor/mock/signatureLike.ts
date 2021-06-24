import type * as ts from 'typescript';
import { core } from '../../core/core';

export type SignatureLike =
  | ts.CallSignatureDeclaration
  | ts.ConstructSignatureDeclaration;

export function isSignatureLike(prop: ts.Node): prop is SignatureLike {
  return (
    prop.kind === core.ts.SyntaxKind.CallSignature ||
    prop.kind === core.ts.SyntaxKind.ConstructSignature
  );
}
