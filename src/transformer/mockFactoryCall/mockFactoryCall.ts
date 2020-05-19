import * as ts from 'typescript';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { GenericDeclaration } from '../genericDeclaration/genericDeclaration';
import { IGenericDeclaration } from '../genericDeclaration/genericDeclaration.interface';
import {
  extensionExpressionSupported,
  GenericDeclarationSupported,
} from '../genericDeclaration/genericDeclarationSupported';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockIdentifierGenericParameter } from '../mockIdentifier/mockIdentifier';
import { Scope } from '../scope/scope';
import { TypescriptCreator } from '../helper/creator';

export function GetMockFactoryCall(typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.CallExpression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeReferenceNode.typeName);

  return getDeclarationMockFactoryCall(declaration, typeReferenceNode, scope);
}

export function CreateMockFactory(typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.CallExpression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeReferenceNode.typeName);
  MockDefiner.instance.createMockFactory(declaration);

  return getDeclarationMockFactoryCall(declaration, typeReferenceNode, scope);
}

export function GetMockFactoryCallIntersection(intersection: ts.IntersectionTypeNode, scope: Scope): ts.Expression {
  const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

  const declarations: ts.Declaration[] | ts.TypeLiteralNode[] = intersection.types.map((type: ts.TypeNode) => {
    if (ts.isTypeReferenceNode(type)) {
      const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(type.typeName);
      const declarationKey: string = MockDefiner.instance.getDeclarationKeyMap(declaration);

      genericDeclaration.addFromTypeReferenceNode(type, declarationKey);

      addFromDeclarationExtensions(declaration as GenericDeclarationSupported, declarationKey, genericDeclaration);

      return declaration;
    }

    return type as ts.TypeLiteralNode;
  });
  const genericsParametersExpression: ts.ObjectLiteralExpression[] = genericDeclaration.getExpressionForAllGenerics();
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryIntersection(declarations, intersection);

  return TypescriptCreator.createCall(
    mockFactoryCall,
    [ts.createArrayLiteral(genericsParametersExpression)],
  );
}

export function GetMockFactoryCallTypeofEnum(declaration: ts.EnumDeclaration): ts.Expression {
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryTypeofEnum(declaration);

  return TypescriptCreator.createCall(
    mockFactoryCall,
    [],
  );
}

export function GetMockFactoryCallForThis(mockKey: string): ts.Expression {
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryByKey(mockKey);

  return TypescriptCreator.createCall(
    mockFactoryCall,
    [MockIdentifierGenericParameter],
  );
}

function getDeclarationMockFactoryCall(declaration: ts.Declaration, typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.CallExpression {
  const declarationKey: string | undefined = MockDefiner.instance.getDeclarationKeyMap(declaration);

  if (!declarationKey) {
    throw new Error(`Failed to look up declaration key in MockDefiner for \`${declaration.getText()}'.`);
  }

  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryByKey(declarationKey);
  const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

  genericDeclaration.addFromTypeReferenceNode(typeReferenceNode, declarationKey);

  addFromDeclarationExtensions(declaration as GenericDeclarationSupported, declarationKey, genericDeclaration);

  const genericsParametersExpression: ts.ObjectLiteralExpression[] = genericDeclaration.getExpressionForAllGenerics();

  return TypescriptCreator.createCall(
    mockFactoryCall,
    [ts.createArrayLiteral(genericsParametersExpression)],
  );
}

function addFromDeclarationExtensions(declaration: GenericDeclarationSupported, declarationKey: string, genericDeclaration: IGenericDeclaration): void {
  if (declaration.heritageClauses) {
    declaration.heritageClauses.forEach((clause: ts.HeritageClause) => {
      clause.types.forEach((extension: ts.ExpressionWithTypeArguments) => {
        if (!extensionExpressionSupported(extension.expression)) {
          return;
        }

        const extensionDeclaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(extension.expression);

        const extensionDeclarationKey: string | undefined = MockDefiner.instance.getDeclarationKeyMap(extensionDeclaration);

        if (!extensionDeclarationKey) {
          throw new Error(`Failed to look up declaration key in MockDefiner for \`${extensionDeclaration.getText()}'.`);
        }

        genericDeclaration.addFromDeclarationExtension(
          declarationKey,
          extensionDeclaration as GenericDeclarationSupported,
          extensionDeclarationKey,
          extension,
        );

        addFromDeclarationExtensions(extensionDeclaration as GenericDeclarationSupported, extensionDeclarationKey, genericDeclaration);
      });
    });
  }
}
