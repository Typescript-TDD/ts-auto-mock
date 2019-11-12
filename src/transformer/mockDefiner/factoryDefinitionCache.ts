import * as ts from 'typescript';

// tslint:disable-next-line:no-any
const urlSlug: any = require('url-slug');

export class FactoryDefinitionCache {
    private _typeMockFactoryKeyMap: WeakMap<ts.Declaration, string>;
    private _declarationKeyMap: WeakMap<ts.Declaration, string>;
    private _keyCounters: Map<string, number>;

    constructor() {
        this._typeMockFactoryKeyMap = new WeakMap();
        this._declarationKeyMap = new WeakMap();
        this._keyCounters = new Map();
    }

    public setFactoryKeyForTypeMock(typeMocked: ts.Declaration): void {
        this._typeMockFactoryKeyMap.set(typeMocked, this.getDeclarationKeyMap(typeMocked));
    }

    public hasFactoryForTypeMock(typeMocked: ts.Declaration): boolean {
        return this._typeMockFactoryKeyMap.has(typeMocked);
    }

    public getFactoryKeyForTypeMock(typeMocked: ts.Declaration): string {
        return this._typeMockFactoryKeyMap.get(typeMocked);
    }

    public setDeclarationKeyMap(typeMocked: ts.Declaration, key: string): void {
        this._declarationKeyMap.set(typeMocked, this.createUniqueKeyForFactory(typeMocked));
    }

    public getDeclarationKeyMap(typeMocked: ts.Declaration): string {
        return this._declarationKeyMap.get(typeMocked);
    }

    public hasDeclarationKeyMap(typeMocked: ts.Declaration): boolean {
        return this._declarationKeyMap.has(typeMocked);
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
