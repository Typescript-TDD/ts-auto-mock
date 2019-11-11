import * as ts from 'typescript';

// tslint:disable-next-line:no-any
const urlSlug: any = require('url-slug');

export interface KeyMap {
    key: string;
    enabled: boolean;
}
export class FactoryDefinitionCache {
    private _typeMockFactoryKeyMap: WeakMap<ts.Declaration, string>;
    private _typeMockFactoryKeyMap2: WeakMap<ts.Declaration, KeyMap>;
    private _keyCounters: Map<string, number>;

    constructor() {
        this._typeMockFactoryKeyMap = new WeakMap();
        this._typeMockFactoryKeyMap2 = new WeakMap();
        this._keyCounters = new Map();
    }

    public setFactoryKeyForTypeMock(typeMocked: ts.Declaration, key: string): void {
        this._typeMockFactoryKeyMap.set(typeMocked, key);
    }

    public setFactoryKeyForTypeMock2(typeMocked: ts.Declaration, key: string): void {
        this._typeMockFactoryKeyMap2.set(typeMocked, {
            key,
            enabled: false,
        });
    }

    public enableFactoryKeyForTypeMock2(typeMocked: ts.Declaration): void {
        const s: KeyMap = this._typeMockFactoryKeyMap2.get(typeMocked);
        this._typeMockFactoryKeyMap2.set(typeMocked, {
            key: s.key,
            enabled: true,
        });
    }

    public getFactoryKeyForTypeMock(typeMocked: ts.Declaration): string {
        return this._typeMockFactoryKeyMap.get(typeMocked);
    }

    public getFactoryKeyForTypeMock2(typeMocked: ts.Declaration): KeyMap {
        return this._typeMockFactoryKeyMap2.get(typeMocked);
    }

    public hasFactoryForTypeMock(typeMocked: ts.Declaration): boolean {
        return this._typeMockFactoryKeyMap.has(typeMocked);
    }

    public hasFactoryForTypeMock2(typeMocked: ts.Declaration): boolean {
        return this._typeMockFactoryKeyMap2.has(typeMocked);
    }

    public isFactoryForTypeMock2Enabled(typeMocked: ts.Declaration): boolean {
        const s: KeyMap = this._typeMockFactoryKeyMap2.get(typeMocked);
        return s && s.enabled;
    }

    public createUniqueKeyForFactory(declarationMocked: ts.Declaration): string {
        const declarationNameIdentifier: ts.Identifier = (declarationMocked as ts.InterfaceDeclaration | ts.ClassDeclaration).name;
        const declarationNameSanitized: string = urlSlug((declarationNameIdentifier && declarationNameIdentifier.text) || 'Anonymous', '_');
        const baseFactoryName: string = `create__${declarationNameSanitized}__mock`;
        const count: number = this._getNextUniqueCounterForKey(baseFactoryName);

        return `${baseFactoryName}_${count}`;
    }

    private _getNextUniqueCounterForKey(name: string): number {
        const count: number = this._keyCounters.get(name) || 1;
        this._keyCounters.set(name, count + 1);

        return count;
    }
}
