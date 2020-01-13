import * as ts from 'typescript';
import { KeyCounter } from './keyCounter';

export type PossibleDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export class FactoryUniqueName {
    private static AnonymousIdentifierText: string = '*';
    private static LiteralIdentifierText: string = 'L';
    private _keyCounter: KeyCounter;

    constructor() {
        this._keyCounter = new KeyCounter();
    }

    public createForDeclaration(declaration: PossibleDeclaration): string {
        const declarationNameIdentifier: ts.Identifier = declaration.name;

        return this.createUniqueName(declarationNameIdentifier && declarationNameIdentifier.text);
    }

    public createForIntersection(nodes: ts.Node[]): string {
        const nameOfDeclarations: string = nodes.reduce((acc: string, declaration: ts.Node) => {
            if (ts.isTypeLiteralNode(declaration)) {
                acc += FactoryUniqueName.LiteralIdentifierText;
            }

            if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration) || ts.isClassDeclaration(declaration)) {
                acc += declaration.name.text;
            }

            return acc;
        }, '');

        return this.createUniqueName(nameOfDeclarations);
    }

    private createUniqueName(name?: string): string {
        const declarationNameSanitized: string = name || FactoryUniqueName.AnonymousIdentifierText;
        const baseFactoryName: string = `@${declarationNameSanitized}`;
        const count: number = this._keyCounter.getFor(baseFactoryName);

        return `${baseFactoryName}_${count}`;
    }
}
