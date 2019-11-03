import * as ts from 'typescript';
import { MockGeneric } from '../mockGeneric/mockGeneric';

export interface CacheTest {
    key1?: string;
    escapedName?: ts.__String;
    descriptor: ts.Expression;
    type: ts.Type;
}

export class Scope {
    private _declarationNode: ts.Node;
    private _mockGeneric: MockGeneric;
    private _anotherCacheTest: CacheTest[];

    constructor() {
        this._mockGeneric = new MockGeneric();
        this._anotherCacheTest = [];
    }

    set declarationNode(node: ts.Node) {
        this._declarationNode = node;
    }

    get declarationNode(): ts.Node {
        return this._declarationNode;
    }

    public addGeneric(node: ts.TypeReferenceNode): void {
        this._mockGeneric.addGeneric(node, this);
    }

    public getAllGenerics(): ts.ObjectLiteralExpression {
        return this._mockGeneric.getAll();
    }

    public hasGeneric(name: ts.TypeParameter): boolean {
        return this._mockGeneric.has(name);
    }

    public hasGenerics(): boolean {
        return this._anotherCacheTest.length > 0;
    }

    public addTest(type: ts.Type, descriptor: ts.Expression): void {
        this._anotherCacheTest.push({type, descriptor});
    }

    public checkTest(type: ts.Type): boolean {
        return !!this.getTest(type);
    }

    public getTest(type: ts.Type): CacheTest {
        return this._anotherCacheTest.find((c: CacheTest) => {
            return c.type === type;
        });
    }

    public getTypes(): CacheTest[] {
        return this._anotherCacheTest;
    }
}
