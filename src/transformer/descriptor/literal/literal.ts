import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import {
  createLiteral,
  createNumericLiteral,
  createStringLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetLiteralDescriptor(
  node: ts.LiteralTypeNode,
  scope: Scope
): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const type: ts.Type = typeChecker.getTypeAtLocation(node);
  const literalType: ts.LiteralType = type as ts.LiteralType;

  if (literalType.value) {
    return createLiteral(literalType);
  } else {
    if (!node.literal) {
      return GetLiteralTokenDescriptor(node);
    }
    return GetDescriptor(node.literal, scope);
  }
}

function GetLiteralTokenDescriptor(
  node: ts.LiteralTypeNode
): ts.StringLiteral | ts.NumericLiteral {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nodeToken: any = node as any;

  if (nodeToken.kind === ts.SyntaxKind.NumericLiteral) {
    return createNumericLiteral(parseInt(nodeToken.text, 10));
  }

  return createStringLiteral(nodeToken.text);
}
