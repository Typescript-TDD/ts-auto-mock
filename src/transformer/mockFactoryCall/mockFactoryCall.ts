import * as ts from 'typescript';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { GenericDeclaration } from '../genericDeclaration/genericDeclaration';
import { IGenericDeclaration } from '../genericDeclaration/genericDeclaration.interface';
import { GenericDeclarationSupported } from '../genericDeclaration/genericDeclarationSupported';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockIdentifierGenericParameter } from '../mockIdentifier/mockIdentifier';
import { Scope } from '../scope/scope';

export function GetMockFactoryCall(typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.Expression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeReferenceNode.typeName);

  return getDeclarationMockFactoryCall(declaration, typeReferenceNode, scope);
}

export function CreateMockFactory(typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.Expression {
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

  return ts.createCall(
    mockFactoryCall,
    [],
    [ts.createArrayLiteral(genericsParametersExpression)],
  );
}

export function GetMockFactoryCallTypeofEnum(declaration: ts.EnumDeclaration): ts.Expression {
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryTypeofEnum(declaration);

  return ts.createCall(
    mockFactoryCall,
    [],
    [],
  );
}

export function GetMockFactoryCallForThis(mockKey: string): ts.Expression {
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryByKey(mockKey);

  return ts.createCall(
    mockFactoryCall,
    [],
    [MockIdentifierGenericParameter],
  );
}

function getDeclarationMockFactoryCall(declaration: ts.Declaration, typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.Expression {
  const declarationKey: string = MockDefiner.instance.getDeclarationKeyMap(declaration);
  const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactoryByKey(declarationKey);
  const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

  genericDeclaration.addFromTypeReferenceNode(typeReferenceNode, declarationKey);

  addFromDeclarationExtensions(declaration as GenericDeclarationSupported, declarationKey, genericDeclaration);

  const genericsParametersExpression: ts.ObjectLiteralExpression[] = genericDeclaration.getExpressionForAllGenerics();

  return ts.createCall(
    mockFactoryCall,
    [],
    [ts.createArrayLiteral(genericsParametersExpression)],
  );
}

function addFromDeclarationExtensions(declaration: GenericDeclarationSupported, declarationKey: string, genericDeclaration: IGenericDeclaration): void {
  if (declaration.heritageClauses) {
    declaration.heritageClauses.forEach((clause: ts.HeritageClause) => {
      clause.types.forEach((extension: ts.ExpressionWithTypeArguments) => {
        const extensionDeclaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(extension.expression);

        const extensionDeclarationKey: string = MockDefiner.instance.getDeclarationKeyMap(extensionDeclaration);

        genericDeclaration.addFromDeclarationExtension(
          declarationKey,
          extensionDeclaration as GenericDeclarationSupported,
          extensionDeclarationKey,
          extension);

        addFromDeclarationExtensions(extensionDeclaration as GenericDeclarationSupported, extensionDeclarationKey, genericDeclaration);
      });
    });
  }
}
