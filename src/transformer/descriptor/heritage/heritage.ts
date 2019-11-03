import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function StoreGenericsFromHeritage(heritageClauses: ts.NodeArray<ts.HeritageClause>, scope: Scope): void {
    if (heritageClauses) {
        heritageClauses.forEach((clause: ts.HeritageClause) => {
            console.log(clause.types);
            clause.types.forEach((expression: ts.ExpressionWithTypeArguments) => {
                if (expression.typeArguments) {
                    const declarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.findParameterOfNode(expression.expression as ts.Identifier);

                    expression.typeArguments.forEach((typeArgument: ts.Node, index: number) => {
                        const descriptor: ts.Expression = GetDescriptor(typeArgument, scope);
                        const type: ts.Type = TypeChecker().getTypeAtLocation(declarationTypeParameters[index]);

                        scope.addTest(type, descriptor);
                    });
                }
            });
        });
    }
}

// store extension as Mock
// pass the mocks back so we can use them during the mock call
// be careful with merging and this.
