import type * as ts from 'typescript';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { GenericDeclaration } from '../genericDeclaration/genericDeclaration';
import { IGenericDeclaration } from '../genericDeclaration/genericDeclaration.interface';
import {
  extensionExpressionSupported,
  GenericDeclarationSupported,
} from '../genericDeclaration/genericDeclarationSupported';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Identifiers } from '../mockIdentifier/mockIdentifier';
import { Scope } from '../scope/scope';
import {
  createArrayLiteral,
  createCall,
} from '../../typescriptFactory/typescriptFactory';
import { core } from '../core/core';

export function GetMockFactoryCall(
  typeReferenceNode: ts.TypeReferenceNode,
  declaration: ts.Declaration,
  scope: Scope,
): ts.Expression {
  return getDeclarationMockFactoryCall(declaration, typeReferenceNode, scope);
}

export function CreateMockFactory(
  typeReferenceNode: ts.TypeReferenceNode,
  declaration: ts.Declaration,
  scope: Scope,
): ts.Expression {
  MockDefiner.instance.createMockFactory(declaration, scope);

  return getDeclarationMockFactoryCall(declaration, typeReferenceNode, scope);
}

export function GetMockFactoryCallIntersection(
  intersection: ts.IntersectionTypeNode,
  scope: Scope,
): ts.Expression {
  const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

  const declarations: ts.Declaration[] | ts.TypeLiteralNode[] =
    intersection.types.map((type: ts.TypeNode) => {
      if (core.ts.isTypeReferenceNode(type)) {
        const declaration: ts.Declaration =
          TypescriptHelper.GetDeclarationFromNode(type.typeName);
        const declarationKey: string =
          MockDefiner.instance.getDeclarationKeyMapBasedOnScope(
            declaration,
            scope,
          );

        genericDeclaration.addFromTypeReferenceNode(type, declarationKey);

        addFromDeclarationExtensions(
          declaration as GenericDeclarationSupported,
          declarationKey,
          genericDeclaration,
          scope,
        );

        return declaration;
      }

      return type as ts.TypeLiteralNode;
    });
  const genericsParametersExpression: ts.ObjectLiteralExpression[] =
    genericDeclaration.getExpressionForAllGenerics();
  const mockFactoryCall: ts.Expression =
    MockDefiner.instance.getMockFactoryIntersection(
      declarations,
      intersection,
      scope,
    );

  return createCall(mockFactoryCall, [
    createArrayLiteral(genericsParametersExpression),
  ]);
}

export function GetMockFactoryCallTypeofEnum(
  declaration: ts.EnumDeclaration,
  scope: Scope,
): ts.Expression {
  const mockFactoryCall: ts.Expression =
    MockDefiner.instance.getMockFactoryTypeofEnum(declaration, scope);
  return createCall(mockFactoryCall, []);
}

export function GetMockFactoryCallForThis(mockKey: string): ts.Expression {
  const mockFactoryCall: ts.Expression =
    MockDefiner.instance.getMockFactoryByKey(mockKey);

  return createCall(mockFactoryCall, [
    Identifiers.MockIdentifierGenericParameter,
  ]);
}

function getDeclarationMockFactoryCall(
  declaration: ts.Declaration,
  typeReferenceNode: ts.TypeReferenceNode,
  scope: Scope,
): ts.Expression {
  const declarationKey: string =
    MockDefiner.instance.getDeclarationKeyMapBasedOnScope(declaration, scope);

  if (!declarationKey) {
    throw new Error(
      `Failed to look up declaration key in MockDefiner for \`${declaration.getText()}'.`,
    );
  }

  const mockFactoryCall: ts.Expression =
    MockDefiner.instance.getMockFactoryByKey(declarationKey);
  const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

  genericDeclaration.addFromTypeReferenceNode(
    typeReferenceNode,
    declarationKey,
  );

  addFromDeclarationExtensions(
    declaration as GenericDeclarationSupported,
    declarationKey,
    genericDeclaration,
    scope,
  );

  const genericsParametersExpression: ts.ObjectLiteralExpression[] =
    genericDeclaration.getExpressionForAllGenerics();

  return createCall(mockFactoryCall, [
    createArrayLiteral(genericsParametersExpression),
  ]);
}

function addFromDeclarationExtensions(
  declaration: GenericDeclarationSupported,
  declarationKey: string,
  genericDeclaration: IGenericDeclaration,
  scope: Scope,
): void {
  if (declaration.heritageClauses) {
    declaration.heritageClauses.forEach((clause: ts.HeritageClause) => {
      clause.types.forEach((extension: ts.ExpressionWithTypeArguments) => {
        if (!extensionExpressionSupported(extension.expression)) {
          return;
        }

        const extensionDeclaration: ts.Declaration =
          TypescriptHelper.GetDeclarationFromNode(extension.expression);

        const extensionDeclarationKey: string =
          MockDefiner.instance.getDeclarationKeyMapBasedOnScope(
            extensionDeclaration,
            scope,
          );

        genericDeclaration.addFromDeclarationExtension(
          declarationKey,
          extensionDeclaration as GenericDeclarationSupported,
          extensionDeclarationKey,
          extension,
        );

        addFromDeclarationExtensions(
          extensionDeclaration as GenericDeclarationSupported,
          extensionDeclarationKey,
          genericDeclaration,
          scope,
        );
      });
    });
  }
}
