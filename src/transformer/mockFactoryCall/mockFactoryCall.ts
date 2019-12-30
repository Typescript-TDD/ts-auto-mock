import * as ts from 'typescript';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { GenericDeclaration } from '../genericDeclaration/genericDeclaration';
import { IGenericDeclaration } from '../genericDeclaration/genericDeclaration.interface';
import { GenericDeclarationSupported } from '../genericDeclaration/genericDeclarationSupported';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockGenericParameter } from '../mockGeneric/mockGenericParameter';
import { Scope } from '../scope/scope';

export function GetMockFactoryCall(typeReferenceNode: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeReferenceNode.typeName);
    const declarationKey: string = MockDefiner.instance.getDeclarationKeyMap(declaration);

    genericDeclaration.addFromTypeReferenceNode(typeReferenceNode, declarationKey);

    addFromDeclarationExtensions(declaration as GenericDeclarationSupported, declarationKey, genericDeclaration);

    const genericsParametersExpression: ts.ObjectLiteralExpression[] = genericDeclaration.getExpressionForAllGenerics();
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(declaration);

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(genericsParametersExpression)],
    );
}

export function GetMockFactoryCallIntersection(intersection: ts.IntersectionTypeNode, scope: Scope): ts.Expression {
    const genericDeclaration: IGenericDeclaration = GenericDeclaration(scope);

    const declarations: ts.Declaration[] | ts.TypeLiteralNode[] = intersection.types.map((type: ts.TypeNode) => {
        if (ts.isTypeReferenceNode(type)) {
            const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode((type as ts.TypeReferenceNode).typeName);
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
        [MockGenericParameter],
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
