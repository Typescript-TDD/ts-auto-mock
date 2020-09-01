import * as ts from 'typescript';
/* eslint-disable dot-notation,@typescript-eslint/ban-ts-comment */
export function GetTypeofEnumDescriptor(
  enumDeclaration: ts.EnumDeclaration
): ts.Expression {
  // @ts-ignore
  enumDeclaration['modifiers'] = undefined;
  return ts.createArrowFunction(
    undefined,
    undefined,
    [],
    ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    ts.createBlock(
      [enumDeclaration, ts.createReturn(enumDeclaration.name)],
      true
    )
  );
}
