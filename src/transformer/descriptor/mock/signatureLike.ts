import * as ts from 'typescript';

export type SignatureLike =
  | ts.CallSignatureDeclaration
  | ts.ConstructSignatureDeclaration;

export function isSignatureLike(prop: ts.Node): prop is SignatureLike {
  return (
    prop.kind === ts.SyntaxKind.CallSignature ||
    prop.kind === ts.SyntaxKind.ConstructSignature
  );
}
