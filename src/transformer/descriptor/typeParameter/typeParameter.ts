import * as ts from 'typescript';
import { KeyMap } from '../../mockDefiner/factoryDefinitionCache';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { MockGenericParameter } from '../../mockGeneric/mockGenericParameter';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration, scope: Scope): ts.Expression {
    const type: ts.TypeParameter = TypeChecker().getTypeAtLocation(node);

    const descriptor: ts.Expression = node.default ? GetDescriptor(node.default, scope) : GetNullDescriptor();

    const declaration: ts.Declaration = type.symbol.declarations[0];
    const typeDeclaration: ts.Declaration = TypescriptHelper.getTypeParameterOwnerMock(declaration);

    //
    const mockDeck: KeyMap = MockDefiner.instance._factoryCache.getFactoryKeyForTypeMock2(typeDeclaration);
    //

    if (!mockDeck) {
        return descriptor;
    }

    const key: string = mockDeck.key + node.name.escapedText;

    return ts.createCall(
        ts.createParen(ts.createFunctionExpression(
            undefined,
            undefined,
            undefined,
            undefined,
            [],
            undefined,
            ts.createBlock(
                [ts.createIf(
                    MockGenericParameter,
                    ts.createBlock(
                        [
                            ts.createVariableStatement(
                                undefined,
                                ts.createVariableDeclarationList(
                                    [ts.createVariableDeclaration(
                                        ts.createIdentifier('result'),
                                        undefined,
                                        ts.createCall(
                                            ts.createPropertyAccess(
                                                MockGenericParameter,
                                                ts.createIdentifier('find')
                                            ),
                                            undefined,
                                            [ts.createArrowFunction(
                                                undefined,
                                                undefined,
                                                [ts.createParameter(
                                                    undefined,
                                                    undefined,
                                                    undefined,
                                                    ts.createIdentifier('value'),
                                                    undefined,
                                                    undefined,
                                                    undefined
                                                )],
                                                undefined,
                                                ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                                                ts.createBlock(
                                                    [ts.createReturn(ts.createBinary(
                                                        ts.createCall(
                                                            ts.createPropertyAccess(
                                                                ts.createPropertyAccess(
                                                                    ts.createIdentifier('value'),
                                                                    ts.createIdentifier('ids')
                                                                ),
                                                                ts.createIdentifier('indexOf')
                                                            ),
                                                            undefined,
                                                            [ts.createStringLiteral(key)]
                                                        ),
                                                        ts.createToken(ts.SyntaxKind.GreaterThanEqualsToken),
                                                        ts.createNumericLiteral('0')
                                                        )
                                                    )],
                                                    true
                                                )
                                            )]
                                        )
                                    )],
                                    ts.NodeFlags.Const
                                )
                            ),
                            ts.createIf(
                                ts.createIdentifier('result'),
                                ts.createBlock(
                                    [ts.createReturn(
                                        ts.createCall(
                                            ts.createPropertyAccess(
                                                ts.createIdentifier('result'),
                                                ts.createIdentifier('value')
                                            ),
                                            undefined,
                                            []
                                        ))],
                                    true
                                ),
                                undefined
                            ),
                            ts.createReturn(descriptor)
                        ],
                        true
                    ),
                    undefined
                ),
                    ts.createReturn(descriptor)],
                true
            )
        )),
        undefined,
        []
    );

    // return ts.createConditional(
    //     ts.createBinary(
    //         MockGenericParameter,
    //         ts.createToken(ts.SyntaxKind.AmpersandAmpersandToken),
    //         ts.createElementAccess(
    //             MockGenericParameter,
    //             ts.createNumericLiteral(typeParameterOwnerIndex.toString()),
    //         ),
    //     ),
    //     ts.createToken(SyntaxKind.QuestionToken),
    //     ts.createCall(ts.createElementAccess(
    //         MockGenericParameter,
    //         ts.createNumericLiteral(typeParameterOwnerIndex.toString()),
    //     ), [], []),
    //     ts.createToken(SyntaxKind.ColonToken),
    //     descriptor,
    // );
}
