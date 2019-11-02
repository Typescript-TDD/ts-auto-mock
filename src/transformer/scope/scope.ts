import * as ts from 'typescript';
import { TypeReferenceCache, TypeReferenceCacheElement } from '../descriptor/typeReference/cache';
import { IScope } from './scope.interface';

export class Scope implements IScope {
    private _declarationNode: ts.Node;
    private _typeReferenceCache: TypeReferenceCache;

    constructor() {
        this._typeReferenceCache = new TypeReferenceCache();
    }

    set declarationNode(node: ts.Node) {
        this._declarationNode = node;
    }

    get declarationNode(): ts.Node {
        return this._declarationNode;
    }

    public addTypeReferenceCacheIfPresentForTypeReference(node: ts.TypeReferenceNode): void {
        if (node.typeArguments) {
            this._typeReferenceCache.addForTypeReference(node, this);
        }
    }

    public addTypeReferenceCacheIfPresentForExpression(node: ts.ExpressionWithTypeArguments): void {
        if (node.typeArguments) {
            this._typeReferenceCache.addForExpression(node, this);
        }
    }

    public getTypeReference(type: ts.Type): TypeReferenceCacheElement {
        return this._typeReferenceCache.get(type);
    }
}
