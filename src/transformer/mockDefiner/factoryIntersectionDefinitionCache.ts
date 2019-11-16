import * as ts from 'typescript';
import { KeyCounter } from './keyCounter';

// tslint:disable-next-line:no-any
const urlSlug: any = require('url-slug');

export interface TypeMockIntersectionDefinition {
    declarations: ts.Declaration[];
    key: string;
    enabled: boolean;
}

export class FactoryIntersectionDefinitionCache {
    private _typeMockIntersection: TypeMockIntersectionDefinition[];
    private _keyCounter: KeyCounter;

    constructor() {
        this._typeMockIntersection = [];
        this._keyCounter = new KeyCounter();
    }

    public setDeclarationIntersectionKeyMap(declarations: ts.Declaration[], key: string): void {
        this._typeMockIntersection.push({
            declarations,
            enabled: false,
            key,
        });
    }

    public setDeclarationIntersectionKeyMapEnabled(definition: TypeMockIntersectionDefinition): void {
        definition.enabled = true;
    }

    public getDeclarationIntersectionKeyMap(declarations: ts.Declaration[]): TypeMockIntersectionDefinition {
        return this._typeMockIntersection.find((intersection: TypeMockIntersectionDefinition) => {
            return intersection.declarations.length === declarations.length &&
                intersection.declarations.every((declaration: ts.Declaration, index: number) => {
                    return declarations[index] === declaration;
                });
        });
    }

    public hasDeclarationIntersectionKeyMap(typeMocked: ts.Declaration[]): boolean {
        return !!this._typeMockIntersection.find((intersection: TypeMockIntersectionDefinition) => {
            return intersection.declarations.length === typeMocked.length && intersection.declarations.every((declaration: ts.Declaration) => {
                return typeMocked.indexOf(declaration) >= 0;
            });
        });
    }

    public createUniqueKeyForIntersectionFactory(declarationsMocked: ts.Declaration[] | ts.TypeLiteralNode[]): string {
        let nameOfDeclarations: string = '';

        declarationsMocked.forEach((declaration: ts.Declaration | ts.TypeLiteralNode, index: number) => {

            if (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration)) {
                if (index > 0) {
                    nameOfDeclarations += '_';
                }

                nameOfDeclarations += declaration.name.text;

            }

            if (ts.isTypeLiteralNode(declaration)) {
                if (index > 0) {
                    nameOfDeclarations += '_';
                }

                nameOfDeclarations += 'literal';
            }
        });

        const declarationNameSanitized: string = urlSlug(nameOfDeclarations || 'Anonymous', '_');
        const baseFactoryName: string = `create__${declarationNameSanitized}__mock`;
        const count: number = this._keyCounter.getFor(baseFactoryName);

        return `${baseFactoryName}_${count}`;
    }
}
