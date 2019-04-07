import * as ts from 'typescript';
import { TypeReferenceCache } from '../typeReference/cache';

export function StoreGenericsFromHeritage(heritageClauses: ts.NodeArray<ts.HeritageClause>): void {
    if (heritageClauses) {
        heritageClauses.forEach((clause: ts.HeritageClause) => {
            clause.types.forEach((expression: ts.ExpressionWithTypeArguments) => {
                TypeReferenceCache.instance.addIfPresentForExpression(expression);
            });
        });
    }
}
