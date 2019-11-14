import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';

export class PropertySignatureCache {
    private _cache: ts.PropertyName;

    private static _instance: PropertySignatureCache;

    public static get instance(): PropertySignatureCache {
        this._instance = this._instance || new PropertySignatureCache();
        return this._instance;
    }

    public set(identifier: ts.PropertyName): void {
        this._cache = identifier;
    }

    public get(): ts.PropertyName {
        return this._cache || TypescriptCreator.createEmptyProperty().name;
    }
}
