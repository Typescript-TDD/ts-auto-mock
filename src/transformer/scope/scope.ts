import * as ts from 'typescript';

export type InterfaceOrClassDeclaration =
  | ts.InterfaceDeclaration
  | ts.ClassDeclaration;
export class Scope {
  private _hydrated: boolean;
  constructor(currentMockKey?: string) {
    this._currentMockKey = currentMockKey;
  }

  public static fromScope(scope: Scope, currentMockKey: string): Scope {
    const newScope: Scope = new Scope(currentMockKey);
    newScope.hydrated = scope.hydrated;
    return newScope;
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
