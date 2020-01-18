import * as ts from 'typescript';

export class DeclarationCache {
  private _declarationKeyMap: WeakMap<ts.Declaration, string>;

  constructor() {
    this._declarationKeyMap = new WeakMap();
  }

  public set(declaration: ts.Declaration, key: string): void {
    this._declarationKeyMap.set(declaration, key);
  }

  public get(declaration: ts.Declaration): string {
    return this._declarationKeyMap.get(declaration);
  }

  public has(declaration: ts.Declaration): boolean {
    return this._declarationKeyMap.has(declaration);
  }
}
