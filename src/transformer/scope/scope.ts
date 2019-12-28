import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
export class Scope {
    constructor(currentMockKey?: string) {
        this._currentMockKey = currentMockKey;
    }

    private readonly _currentMockKey: string;

    get currentMockKey(): string {
        return this._currentMockKey;
    }
}
