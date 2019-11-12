import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { TypescriptCreator } from '../helper/creator';
import { MockGenericParameterIds, MockGenericParameterValue } from '../mockGeneric/mockGenericParameter';
import { Scope } from '../scope/scope';
import { IGenericDeclaration } from './genericDeclaration.interface';
import { GenericDeclarationSupported } from './genericDeclarationSupported';
import { GenericParameter } from './genericParameter';

export function GenericDeclaration(scope: Scope): IGenericDeclaration {
    const generics: GenericParameter[] = [];

    function addGenericParameterToExisting(
        ownerParameterDeclaration: ts.TypeParameterDeclaration,
        typeParameterDeclaration: ts.TypeParameterDeclaration,
        declarationKey: string,
        extensionDeclarationKey: string): void {
        const existingUniqueName: string = declarationKey + typeParameterDeclaration.name.escapedText;
        const uniqueName: string = extensionDeclarationKey + ownerParameterDeclaration.name.escapedText;

        const parameterToAdd: GenericParameter = generics.find((genericParameter: GenericParameter) => {
            return genericParameter.ids.indexOf(existingUniqueName) >= 0;
        });

        parameterToAdd.ids.push(uniqueName);
    }

    function createGenericParameter(ownerKey: string, nodeOwnerParameter: ts.TypeParameterDeclaration, genericDescriptor: ts.Expression): GenericParameter {
        const uniqueName: string = ownerKey + nodeOwnerParameter.name.escapedText;
        const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(ts.createBlock(
            [ts.createReturn(genericDescriptor)],
        ));

        return {
            ids: [uniqueName],
            value: genericFunction,
        };
    }

    return {
        addFromTypeReferenceNode(node: ts.TypeReferenceNode, declarationKey: string): void {
            const typeParameterDeclarations: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.GetParameterOfNode(node.typeName);

            node.typeArguments.forEach((argument: ts.TypeNode, index: number) => {
                const genericDescriptor: ts.Expression = GetDescriptor(argument, scope);
                const genericParameter: GenericParameter = createGenericParameter(declarationKey, typeParameterDeclarations[index], genericDescriptor);
                generics.push(genericParameter);
            });
        },
        addFromDeclarationExtension(
            declarationKey: string,
            extensionDeclaration: GenericDeclarationSupported,
            extensionDeclarationKey: string,
            extension: ts.ExpressionWithTypeArguments): void {
            const extensionDeclarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> = extensionDeclaration.typeParameters;

            extension.typeArguments.forEach((typeArgument: ts.TypeNode, index: number) => {
                if (ts.isTypeReferenceNode(typeArgument)) {
                    const typeParameterDeclaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeArgument.typeName);
                    if (ts.isTypeParameterDeclaration(typeParameterDeclaration)) {
                        const ownerTypeParameter: ts.Declaration = TypescriptHelper.getTypeParameterOwnerMock(typeParameterDeclaration);
                        if (TypescriptHelper.IsDeclarationThatSupportsGenerics(ownerTypeParameter)) {
                            addGenericParameterToExisting(
                                extensionDeclarationTypeParameters[index],
                                typeParameterDeclaration,
                                declarationKey,
                                extensionDeclarationKey,
                            );
                        }
                    } else {
                        const genericParameter: GenericParameter = createGenericParameter(
                            extensionDeclarationKey,
                            extensionDeclarationTypeParameters[index],
                            GetDescriptor(typeArgument, scope),
                        );

                        generics.push(genericParameter);
                    }

                } else {
                    const genericParameter: GenericParameter = createGenericParameter(
                        extensionDeclarationKey,
                        extensionDeclarationTypeParameters[index],
                        GetDescriptor(typeArgument, scope),
                    );

                    generics.push(genericParameter);
                }
            });
        },
        getExpressionForAllGenerics(): ts.ObjectLiteralExpression[] {
            return generics.map((s: GenericParameter) => {
                return ts.createObjectLiteral(
                    [
                        ts.createPropertyAssignment(
                            MockGenericParameterIds,
                            ts.createArrayLiteral(
                                s.ids.map((arr: string) => {
                                    return ts.createStringLiteral(arr);
                                }),
                                false,
                            ),
                        ),
                        ts.createPropertyAssignment(
                            MockGenericParameterValue,
                            s.value,
                        ),
                    ],
                    true,
                );
            });
        },
    };
}
