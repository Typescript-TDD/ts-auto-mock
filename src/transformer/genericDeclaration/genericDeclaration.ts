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

    function isGenericProvided(node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments, index: number): boolean {
        return !!node.typeArguments && !!node.typeArguments[index];
    }

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

            if (!typeParameterDeclarations) {
                return;
            }

            typeParameterDeclarations.forEach((argument: ts.TypeParameterDeclaration, index: number) => {
                let generic: ts.TypeNode;

                if (isGenericProvided(node, index)) {
                    generic = node.typeArguments[index];
                } else {
                    generic = argument.default;
                }

                const genericParameter: GenericParameter = createGenericParameter(
                    declarationKey,
                    typeParameterDeclarations[index],
                    GetDescriptor(generic, scope));

                generics.push(genericParameter);
            });

        },
        addFromDeclarationExtension(
            declarationKey: string,
            extensionDeclaration: GenericDeclarationSupported,
            extensionDeclarationKey: string,
            extension: ts.ExpressionWithTypeArguments): void {
            const extensionDeclarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> = extensionDeclaration.typeParameters;

            if (!extensionDeclarationTypeParameters) {
                return;
            }

            extensionDeclarationTypeParameters.forEach((argument: ts.TypeParameterDeclaration, index: number) => {
                if (isGenericProvided(extension, index)) {
                    const typeArgument: ts.TypeNode = extension.typeArguments[index];

                    if (ts.isTypeReferenceNode(typeArgument)) {
                        const typeParameterDeclaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(typeArgument.typeName);
                        if (ts.isTypeParameterDeclaration(typeParameterDeclaration)) {
                            addGenericParameterToExisting(
                                extensionDeclarationTypeParameters[index],
                                typeParameterDeclaration,
                                declarationKey,
                                extensionDeclarationKey,
                            );
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
                } else {
                    const genericParameter: GenericParameter = createGenericParameter(
                        extensionDeclarationKey,
                        extensionDeclarationTypeParameters[index],
                        GetDescriptor(argument.default, scope),
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
