import * as ts from 'typescript';

export type InterfaceOrClassDeclaration =
  | ts.InterfaceDeclaration
  | ts.ClassDeclaration;
export class Scope {
  private _hydrated: boolean;
  constructor(currentMockKey?: string) {
    this._currentMockKey = currentMockKey;
  }

  private readonly _currentMockKey: string | undefined;

  public get currentMockKey(): string | undefined {
    return this._currentMockKey;
  }

  public get hydrated(): boolean {
    return this._hydrated;
  }

  public set hydrated(hydrated: boolean) {
    this._hydrated = hydrated;
  }
}
