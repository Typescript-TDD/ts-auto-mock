import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';

export function StoreGenericsFromHeritage(heritageClauses: ts.NodeArray<ts.HeritageClause>, scope: IScope): void {
    if (heritageClauses) {
        heritageClauses.forEach((clause: ts.HeritageClause) => {
            clause.types.forEach((expression: ts.ExpressionWithTypeArguments) => {
                scope.addTypeReferenceCacheIfPresentForExpression(expression);
            });
        });
    }
}
