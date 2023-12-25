import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import {
  GetMockPropertiesFromDeclarations,
  GetMockPropertiesFromSymbol,
} from '../mock/mockProperties';
import { isPropertyLike, PropertyLike } from '../mock/propertyLike';
import { isSignatureLike, SignatureLike } from '../mock/signatureLike';

export function GetProperties(node: ts.Node, scope: Scope): ts.Expression {
  const typeChecker: ts.TypeChecker = core.typeChecker;
  const type: ts.Type = typeChecker.getTypeAtLocation(node);
  const symbols: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

  if (!symbols.length && core.ts.isTypeLiteralNode(node)) {
    return GetPropertiesFromMembers(node, scope);
  } else {
    const signatures: Array<ts.Signature> = [];

    Array.prototype.push.apply(
      signatures,
      typeChecker.getSignaturesOfType(type, core.ts.SignatureKind.Call),
    );
    Array.prototype.push.apply(
      signatures,
      typeChecker.getSignaturesOfType(type, core.ts.SignatureKind.Construct),
    );

    return GetMockPropertiesFromSymbol(symbols, signatures, scope);
  }
}

export function GetPropertiesFromMembers(
  node: ts.TypeLiteralNode,
  scope: Scope,
): ts.Expression {
  const members: ts.NodeArray<ts.NamedDeclaration> = node.members;
  const signatures: Array<SignatureLike> = [];
  const properties: Array<PropertyLike> = [];

  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i: number = 0; i < members.length; i++) {
    const declaration: ts.NamedDeclaration = members[i];

    if (isSignatureLike(declaration)) {
      signatures.push(declaration);
    } else if (isPropertyLike(declaration)) {
      properties.push(declaration);
    }
  }

  return GetMockPropertiesFromDeclarations(properties, signatures, scope);
}
