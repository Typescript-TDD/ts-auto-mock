import * as ts from 'typescript';
import { Scope } from '../../scope/scope';

export function GetTypeofEnumDescriptor(enumDeclaration: ts.EnumDeclaration, scope: Scope): ts.Expression {
  enumDeclaration.modifiers = undefined;
  enumDeclaration.name = ts.createFileLevelUniqueName(enumDeclaration.name.text);

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
