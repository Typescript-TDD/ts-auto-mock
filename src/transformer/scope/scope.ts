import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
export class Scope {
  constructor(currentMockKey?: string) {
    this._currentMockKey = currentMockKey;
  }

  private readonly _currentMockKey: string | undefined;
  private _boundFor: string | undefined;

  private _appendConstructorMarker(): string {
    return this._boundFor !== undefined ? '_C' : '';
  }

  public bindFor(key: string): this {
    this._boundFor = key;

    return this;
  }

  public isBoundFor(key: string): boolean {
    return this._boundFor === key;
  }

  public get currentMockKey(): string | undefined {
    if (this._currentMockKey === undefined) {
      return;
    }

    return this._currentMockKey + this._appendConstructorMarker();
  }
}
