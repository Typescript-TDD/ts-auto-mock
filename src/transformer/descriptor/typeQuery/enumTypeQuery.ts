import * as ts from 'typescript';

export function GetTypeofEnumDescriptor(enumDeclaration: ts.EnumDeclaration): ts.Expression {
  enumDeclaration.modifiers = undefined;

  return ts.createArrowFunction(
    undefined,
    undefined,
    [],
    ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    ts.createBlock(
      [
        enumDeclaration,
        ts.createReturn(enumDeclaration.name),
      ],
      true,
    ),
  );
}
