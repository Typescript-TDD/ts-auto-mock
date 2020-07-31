import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;

export class Scope {
  constructor(currentMockKey?: string) {
    this._currentMockKey = currentMockKey;
  }

  private _boundFor: string | undefined;
  private readonly _currentMockKey: string | undefined;
  private _parent: this | undefined;

  public newNestedScope(currentMockKey: string): Scope {
    const nestedScope: Scope = new Scope(currentMockKey);

    nestedScope._parent = this;

    return nestedScope;
  }

  public bindFor(key: string): this {
    this._boundFor = key;

    return this;
  }

  public isBoundFor(extensionKey: string): boolean {
    let isBound: boolean = this._boundFor === extensionKey;

    if (isBound) {
      return isBound;
    }

    let parent: Scope | undefined = this._parent;

    while (parent) {
      isBound = this._currentMockKey === parent._currentMockKey && parent._boundFor === extensionKey;

      if (isBound) {
        break;
      }

      parent = parent._parent;

    }

    return isBound;
  }

  public get currentMockKey(): string | undefined {
    return this._currentMockKey;
  }
}
