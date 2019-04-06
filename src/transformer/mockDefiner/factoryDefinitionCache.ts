import * as ts from 'typescript';
const urlSlug = require("url-slug");

export class FactoryDefinitionCache {
	private _typeMockFactoryKeyMap: WeakMap<ts.Declaration, string>;
	private _keyCounters: Map<string, number>;

	constructor() {
		this._typeMockFactoryKeyMap = new WeakMap();
		this._keyCounters = new Map();
	}

	public setFactoryKeyForTypeMock(typeMocked: ts.Declaration, key: string): void {
		this._typeMockFactoryKeyMap.set(typeMocked, key);
	}

	public getFactoryKeyForTypeMock(typeMocked: ts.Declaration): string {
		return this._typeMockFactoryKeyMap.get(typeMocked);
	}

	public hasFactoryForTypeMock(typeMocked: ts.Declaration): boolean {
		return this._typeMockFactoryKeyMap.has(typeMocked);
	}

	public createUniqueKeyForFactory(declarationMocked: ts.Declaration): string {
		const declarationNameIdentifier = (declarationMocked as ts.InterfaceDeclaration | ts.ClassDeclaration).name;
		const declarationNameSanitized: string = urlSlug((declarationNameIdentifier && declarationNameIdentifier.text) || 'Anonimous', "_");
		const baseFactoryName: string = `create__${declarationNameSanitized}__mock`;
		const count = this._getNextUniqueCounterForKey(baseFactoryName);

		return `${baseFactoryName}_${count}`
	}

	private _getNextUniqueCounterForKey(name: string): number {
		const count = this._keyCounters.get(name) || 1;
		this._keyCounters.set(name, count + 1);

		return count;
	}
}
