import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
export class Scope {
    public readonly depth: number;
    public isThisObjectAvailable: boolean = false;
    private readonly _currentMockKey: string;
    
    constructor(depth: number, currentMockKey?: string) {
        this.depth = depth;
        this._currentMockKey = currentMockKey;
    }

    get currentMockKey(): string {
        return this._currentMockKey;
    }
}
