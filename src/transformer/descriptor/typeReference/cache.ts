import * as ts from 'typescript';

interface TypeReferenceCacheElement {
    type: ts.Type,
    descriptor: ts.Expression
}

export class TypeReferenceCache {
    private static _instance: TypeReferenceCache;
    private _cache: Array<TypeReferenceCacheElement>;

    public static get instance(): TypeReferenceCache {
        this._instance = this._instance || new TypeReferenceCache();
        return this._instance;
    }

    public clear(): void {
        this._cache = [];
    }

    public add(type: ts.Type, descriptor: ts.Expression): void {
        this._cache.push({
            type, descriptor
        });
    }

    public get(type: ts.Type): TypeReferenceCacheElement {
        return this._cache.find((element) => {
            return element.type === type;
        })
    }
}