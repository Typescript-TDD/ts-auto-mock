import * as ts from 'typescript';
import { TypeReferenceCache } from '../typeReference/cache';

export function StoreGenericsFromHeritage(heritageClauses: ts.NodeArray<ts.HeritageClause>) {
    if (heritageClauses) {
        heritageClauses.forEach((clause: ts.HeritageClause) => {
            clause.types.forEach((clause) => {   
                TypeReferenceCache.instance.addIfPresentForExpression(clause);            
            });
        });
    }
}