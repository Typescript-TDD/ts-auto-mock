import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { TypescriptCreator } from '../helper/creator';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockGenericParameter } from '../mockGeneric/mockGenericParameter';
import { InterfaceOrClassDeclaration, Scope } from '../scope/scope';

interface GenericParameter {
    ids: string[];
    value: ts.Expression;
}

export function GetMockFactoryCall(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const genericsParameters: GenericParameter[] = [];
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);

    const hasMockKey: boolean = MockDefiner.instance._factoryCache.hasFactoryForTypeMock2(declaration);
    if (!hasMockKey) {
        MockDefiner.instance._factoryCache.setFactoryKeyForTypeMock2(declaration, MockDefiner.instance._factoryCache.createUniqueKeyForFactory(declaration));
    }

    const key: string = MockDefiner.instance._factoryCache.getFactoryKeyForTypeMock2(declaration).key;

    const typeParameterDeclarations: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.GetParameterOfNode(node.typeName);

    function test(intOrClassDeclaration: InterfaceOrClassDeclaration): void {
        if (intOrClassDeclaration.heritageClauses) {
            intOrClassDeclaration.heritageClauses.forEach((clause: ts.HeritageClause) => {
                clause.types.forEach((expression: ts.ExpressionWithTypeArguments) => {
                    if (expression.typeArguments) {

                        const nodeOwner: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(expression.expression);

                        if (TypescriptHelper.IsInterfaceOrClassDeclaration(nodeOwner)) {
                            const hasMockKey2: boolean = MockDefiner.instance._factoryCache.hasFactoryForTypeMock2(nodeOwner);
                            if (!hasMockKey2) {
                                MockDefiner.instance._factoryCache.setFactoryKeyForTypeMock2(nodeOwner, MockDefiner.instance._factoryCache.createUniqueKeyForFactory(nodeOwner));
                            }

                            const newKey: string = MockDefiner.instance._factoryCache.getFactoryKeyForTypeMock2(nodeOwner).key;

                            const intOrClassDeclarationOwner: InterfaceOrClassDeclaration = nodeOwner as InterfaceOrClassDeclaration;
                            const nodeOwnerParameters: ts.NodeArray<ts.TypeParameterDeclaration> = intOrClassDeclarationOwner.typeParameters;

                            expression.typeArguments.forEach((typeArgument: ts.TypeNode, index: number) => {
                                if (ts.isTypeReferenceNode(typeArgument)) {
                                    const typeParameterDeclaration: ts.TypeParameterDeclaration = TypescriptHelper.GetDeclarationFromNode(typeArgument.typeName) as ts.TypeParameterDeclaration;
                                    if (ts.isTypeParameterDeclaration(typeParameterDeclaration)) {
                                        const owner: ts.Declaration = TypescriptHelper.getTypeParameterOwnerMock(typeParameterDeclaration);
                                        if (TypescriptHelper.IsInterfaceOrClassDeclaration(owner)) {
                                            const ownerTypeParameterDeclaration: ts.TypeParameterDeclaration = nodeOwnerParameters[index];

                                            const existingUniqueName: string = key + typeParameterDeclaration.name.escapedText;
                                            const uniqueName: string = newKey + ownerTypeParameterDeclaration.name.escapedText;

                                            const parameterToAdd: GenericParameter = genericsParameters.find((v: GenericParameter) => {
                                                return v.ids.indexOf(existingUniqueName) >= 0;
                                            });

                                            parameterToAdd.ids.push(uniqueName);
                                        }
                                    } else {
                                        const ownerTypeParameterDeclaration: ts.TypeParameterDeclaration = nodeOwnerParameters[index];
                                        const uniqueName: string = newKey + ownerTypeParameterDeclaration.name.escapedText;
                                        const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(ts.createBlock(
                                            [ts.createReturn(GetDescriptor(typeArgument, scope))],
                                        ));
                                        genericsParameters.push({
                                            ids: [uniqueName],
                                            value: genericFunction,
                                        });
                                    }

                                } else {
                                    const ownerTypeParameterDeclaration: ts.TypeParameterDeclaration = nodeOwnerParameters[index];
                                    const uniqueName: string = newKey + ownerTypeParameterDeclaration.name.escapedText;
                                    const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(ts.createBlock(
                                        [ts.createReturn(GetDescriptor(typeArgument, scope))],
                                    ));
                                    genericsParameters.push({
                                        ids: [uniqueName],
                                        value: genericFunction,
                                    });

                                }
                            });
                            test(nodeOwner as InterfaceOrClassDeclaration);
                        }

                    }
                });
            });
        }
    }

    // extensionssss

    if (node.typeArguments) {
        node.typeArguments.forEach((argument: ts.TypeNode, index: number) => {
            let genericDescriptor: ts.Expression;

            genericDescriptor = GetDescriptor(argument, scope);

            const uniqueName: string = key + typeParameterDeclarations[index].name.escapedText;

            const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(ts.createBlock(
                [ts.createReturn(genericDescriptor)],
            ));

            genericsParameters.push({
                ids: [uniqueName],
                value: genericFunction,
            });
        });
    }

    if (TypescriptHelper.IsInterfaceOrClassDeclaration(declaration)) {
        const intOrClassDeclaration: InterfaceOrClassDeclaration = declaration as InterfaceOrClassDeclaration;
        test(intOrClassDeclaration);
    }

    const genericsParametersExpression: ts.ObjectLiteralExpression[] = genericsParameters.map((s: GenericParameter) => {
        return ts.createObjectLiteral(
            [
                ts.createPropertyAssignment(
                    ts.createIdentifier('ids'),
                    ts.createArrayLiteral(
                        s.ids.map((arr: string) => {
                            return ts.createStringLiteral(arr);
                        }),
                        false,
                    ),
                ),
                ts.createPropertyAssignment(
                    ts.createIdentifier('value'),
                    s.value,
                ),
            ],
            true,
        );
    });
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(declaration);

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(genericsParametersExpression)],
    );
}

export function GetMockFactoryCallForThis(declaration: ts.Declaration): ts.Expression {
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(declaration);

    return ts.createCall(
        mockFactoryCall,
        [],
        [MockGenericParameter],
    );
}
