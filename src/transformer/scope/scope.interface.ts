import * as ts from 'typescript';
import { TypeReferenceCacheElement } from '../descriptor/typeReference/cache';

export interface IScope {
    declarationNode: ts.Node;
    addTypeReferenceCacheIfPresentForTypeReference(node: ts.TypeReferenceNode): void;
    addTypeReferenceCacheIfPresentForExpression(node: ts.ExpressionWithTypeArguments): void;
    getTypeReference(type: ts.Type): TypeReferenceCacheElement;
}
