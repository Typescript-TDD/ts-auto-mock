import * as ts from 'typescript';
import { MockCallAnonymousText, MockCallLiteralText } from '../mockIdentifier/mockIdentifier';
import { KeyCounter } from './keyCounter';

export type PossibleDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export class FactoryUniqueName {
  private _keyCounter: KeyCounter;

  constructor() {
    this._keyCounter = new KeyCounter();
  }

  public createForDeclaration(declaration: PossibleDeclaration): string {
    const declarationNameIdentifier: ts.Identifier | undefined = declaration.name;

    return this.createUniqueName(declarationNameIdentifier && declarationNameIdentifier.text);
  }

  public createForIntersection(nodes: ts.Node[]): string {
    const nameOfDeclarations: string = nodes.reduce((acc: string, declaration: ts.Node) => {
      if (ts.isTypeLiteralNode(declaration)) {
        acc += MockCallLiteralText;
      }

      if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration) || ts.isClassDeclaration(declaration)) {
        acc += declaration.name?.text || '';
      }

      return acc;
    }, '');

    return this.createUniqueName(nameOfDeclarations);
  }

  private createUniqueName(name?: string): string {
    const declarationNameSanitized: string = name || MockCallAnonymousText;
    const baseFactoryName: string = `@${declarationNameSanitized}`;
    const count: number = this._keyCounter.getFor(baseFactoryName);

    return `${baseFactoryName}_${count}`;
  }
}
