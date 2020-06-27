import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
export class Scope {
  constructor(currentMockKey?: string) {
    this._bound = false;
    this._currentMockKey = currentMockKey;
  }

  private readonly _currentMockKey: string | undefined;
  private _bound: boolean;

  private _appendConstructorMarker(): string {
    return this._bound ? '_C' : '';
  }

  public bind(): this {
    this._bound = true;

    return this;
  }

  public isBound(): boolean {
    return this._bound;
  }

  public get currentMockKey(): string | undefined {
    if (this._currentMockKey === undefined) {
      return;
    }

    return this._currentMockKey + this._appendConstructorMarker();
  }
}
