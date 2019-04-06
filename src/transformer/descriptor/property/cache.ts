import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";

export class PropertySignatureCache {
    private static _instance: PropertySignatureCache;
    private _cache: ts.PropertyName;

    public static get instance(): PropertySignatureCache {
        this._instance = this._instance || new PropertySignatureCache();
        return this._instance;
    }

    public set(identifier: ts.PropertyName): void {
        this._cache = identifier;
    }

    public get(): ts.PropertyName {
        return this._cache || TypescriptHelper.createEmptyProperty().name;
    }
}
