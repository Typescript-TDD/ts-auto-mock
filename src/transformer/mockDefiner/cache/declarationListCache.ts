import * as ts from 'typescript';
import { ArrayHelper } from '../../array/array';

export interface DeclarationListCacheElement {
    declarations: ts.Declaration[];
    key: string;
}

export class DeclarationListCache {
    private _cache: DeclarationListCacheElement[];

    constructor() {
        this._cache = [];
    }

    public set(declarations: ts.Declaration[], key: string): void {
        this._cache.push({
            declarations,
            key,
        });
    }

    public get(declarations: ts.Declaration[]): string {
        return this._find(declarations).key;
    }

    public has(declarations: ts.Declaration[]): boolean {
        return !!this._find(declarations);
    }

    private _find(declarations: ts.Declaration[]): DeclarationListCacheElement {
        return this._cache.find((intersection: DeclarationListCacheElement) => {
            return ArrayHelper.AreEqual(declarations, intersection.declarations);
        });
    }
}
