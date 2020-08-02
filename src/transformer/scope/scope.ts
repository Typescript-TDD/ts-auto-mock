import * as ts from 'typescript';

export type InterfaceOrClassDeclaration =
  | ts.InterfaceDeclaration
  | ts.ClassDeclaration;
export class Scope {
  constructor(currentMockKey?: string) {
    this._currentMockKey = currentMockKey;
  }

  private readonly _currentMockKey: string | undefined;

  public get currentMockKey(): string | undefined {
    return this._currentMockKey;
  }
}
