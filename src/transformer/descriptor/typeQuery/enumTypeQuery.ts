import * as ts from 'typescript';
import { Scope } from '../../scope/scope';

export function GetTypeofEnumDescriptor(enumDeclaration: ts.EnumDeclaration, scope: Scope): ts.Expression {
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
