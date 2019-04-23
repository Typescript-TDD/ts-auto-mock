import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { GetTypeReferenceDescriptor } from '../descriptor/typeReference/typeReference';
import { createImportOnIdentifier } from '../helper/import';
import { TypeChecker } from '../typeChecker/typeChecker';
import { FactoryDefinitionCache } from './factoryDefinitionCache';

// tslint:disable-next-line:no-any
const urlSlug: any = require('url-slug');

type PossibleTypeNode = ts.TypeReferenceNode | ts.FunctionTypeNode | ts.TypeLiteralNode;

function GetPossibleDescriptor(node: ts.Node): ts.Expression {
    if (node.kind === ts.SyntaxKind.TypeReference) {
        return GetTypeReferenceDescriptor((node as ts.TypeReferenceNode));
    }

    return GetDescriptor(node);
}

export class MockDefiner {
    private _neededImportIdentifierPerFile: { [key: string]: ts.Identifier } = {};
    private _neededImportProviderIdentifierPerFile: { [key: string]: ts.Identifier } = {};
    private _neededImportExtensionIdentifierPerFile: { [key: string]: ts.Identifier } = {};
    private _factoryRegistrationsPerFile: { [key: string]: Array<{ key: ts.Declaration; factory: ts.Expression }> } = {};
    private _factoryCache: FactoryDefinitionCache;
    private _fileName: string;

    private constructor() {
        this._factoryCache = new FactoryDefinitionCache();
    }

    private static _instance: MockDefiner;

    public static get instance(): MockDefiner {
        this._instance = this._instance || new MockDefiner();
        return this._instance;
    }

    public currentProviderImportName: ts.Identifier;
    public currentExtensionImportName: ts.Identifier;

    public setFileNameFromNode(node: ts.TypeNode): void {
        // tslint:disable-next-line:no-any
        const thisFile: any = node.getSourceFile();
        this._fileName = thisFile.fileName;
    }

    public setTsAutoMockImportIdentifier(): void {
        if (!this._neededImportIdentifierPerFile[this._fileName]) {
            this._neededImportIdentifierPerFile[this._fileName] = ts.createFileLevelUniqueName(`${urlSlug(this._fileName, '_')}_repository`);
            this._neededImportProviderIdentifierPerFile[this._fileName] = ts.createFileLevelUniqueName(`${urlSlug(this._fileName, '_')}_provider`);
            this._neededImportExtensionIdentifierPerFile[this._fileName] = ts.createFileLevelUniqueName(`${urlSlug(this._fileName, '_')}_extension`);
        }
        this.currentProviderImportName = this._neededImportProviderIdentifierPerFile[this._fileName];
        this.currentExtensionImportName = this._neededImportExtensionIdentifierPerFile[this._fileName];
    }

    public getTopStatementsForFile(sourceFile: ts.SourceFile): ts.Statement[] {
        return [...this._getImportsToAddInFile(sourceFile), ...this._getExportsToAddInFile(sourceFile)];
    }

    public initFile(sourceFile: ts.SourceFile): void {
        this._factoryRegistrationsPerFile[sourceFile.fileName] = [];
    }

    public getMockFactory(node: PossibleTypeNode): ts.Expression {
        const typeChecker: ts.TypeChecker = TypeChecker();
        const definedType: ts.Type = typeChecker.getTypeAtLocation(node);
        const declaration: ts.TypeNode | ts.Declaration = TypescriptHelper.GetDeclarationFromType(definedType);

        const thisFileName: string = this._fileName;

        this.setTsAutoMockImportIdentifier();

        const key: string = this._getMockFactoryId(thisFileName, node, declaration as ts.Declaration);

        return ts.createCall(
            ts.createPropertyAccess(
                this._mockRepositoryAccess(thisFileName),
                ts.createIdentifier('getFactory'),
            ),
            [],
            [ts.createStringLiteral(key)],
        );
    }

    private _mockRepositoryAccess(filename: string): ts.Expression {
        return ts.createPropertyAccess(
            ts.createPropertyAccess(
                this._neededImportIdentifierPerFile[filename],
                ts.createIdentifier('Repository'),
            ),
            ts.createIdentifier('instance'),
        );
    }

    private _getMockFactoryId(thisFileName: string, type: PossibleTypeNode, declaration: ts.Declaration): string {
        if (this._factoryCache.hasFactoryForTypeMock(declaration)) {
            return this._factoryCache.getFactoryKeyForTypeMock(declaration);
        }

        this._factoryCache.setFactoryKeyForTypeMock(
            declaration,
            this._factoryCache.createUniqueKeyForFactory(declaration),
        );

        this._factoryRegistrationsPerFile[thisFileName] = this._factoryRegistrationsPerFile[thisFileName] || [];

        const descriptor: ts.Expression = GetPossibleDescriptor(type);

        this._factoryRegistrationsPerFile[thisFileName].push({
            key: declaration,
            factory: ts.createFunctionExpression(undefined, undefined, undefined, undefined, [], undefined,
                ts.createBlock(
                    [ts.createReturn(descriptor)],
                ),
            ),
        });

        return this._factoryCache.getFactoryKeyForTypeMock(declaration);
    }

    private _getImportsToAddInFile(sourceFile: ts.SourceFile): ts.Statement[] {
        if (this._neededImportIdentifierPerFile[sourceFile.fileName]) {
            return [
                createImportOnIdentifier('ts-auto-mock/repository', this._neededImportIdentifierPerFile[sourceFile.fileName]),
                createImportOnIdentifier('ts-auto-mock/provider', this._neededImportProviderIdentifierPerFile[sourceFile.fileName]),
                createImportOnIdentifier('ts-auto-mock/extension', this._neededImportExtensionIdentifierPerFile[sourceFile.fileName]),
            ];
        }

        return [];
    }

    private _getExportsToAddInFile(sourceFile: ts.SourceFile): ts.Statement[] {
        if (this._factoryRegistrationsPerFile[sourceFile.fileName]) {
            return this._factoryRegistrationsPerFile[sourceFile.fileName]
                .map((reg: { key: ts.Declaration; factory: ts.Expression }) => this._createRegistration(sourceFile.fileName, reg.key, reg.factory));
        }

        return [];
    }

    private _createRegistration(filename: string, key: ts.Declaration, factory: ts.Expression): ts.Statement {
        return ts.createExpressionStatement(
            ts.createCall(
                ts.createPropertyAccess(
                    this._mockRepositoryAccess(filename),
                    ts.createIdentifier('registerFactory'),
                ),
                [],
                [ts.createStringLiteral(this._factoryCache.getFactoryKeyForTypeMock(key)), factory],
            ),
        );
    }
}
