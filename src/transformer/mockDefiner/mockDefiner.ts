import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { GetTypeReferenceDescriptor } from '../descriptor/typeReference/typeReference';
import { createImportOnIdentifier } from '../helper/import';
import { MockGenericParameter } from '../mockGeneric/mockGenericParameter';
import { Scope } from '../scope/scope';
import { FactoryDefinitionCache } from './factoryDefinitionCache';
import { ModuleName } from './modules/moduleName';
import { ModuleNameIdentifier } from './modules/moduleNameIdentifier';
import { ModulesImportUrl } from './modules/modulesImportUrl';

// tslint:disable-next-line:no-any
const urlSlug: any = require('url-slug');

function GetPossibleDescriptor(node: ts.Node): ts.Expression {
    const scope: Scope = new Scope();

    if (ts.isTypeReferenceNode(node)) {
        return GetTypeReferenceDescriptor(node, scope);
    }

    return GetDescriptor(node, scope);
}

export class MockDefiner {
    private _neededImportIdentifierPerFile: { [key: string]: Array<ModuleNameIdentifier> } = {};
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

    public setFileNameFromNode(node: ts.TypeNode): void {
        const thisFile: ts.SourceFile = node.getSourceFile();
        this._fileName = thisFile.fileName;
    }

    public setTsAutoMockImportIdentifier(): void {
        if (!this._neededImportIdentifierPerFile[this._fileName]) {
            this._neededImportIdentifierPerFile[this._fileName] = Object.keys(ModulesImportUrl).map((key: ModuleName) => {
                return {
                    name: key,
                    moduleUrl: ModulesImportUrl[key],
                    identifier: this._createUniqueFileName(key),
                };
            });
        }
    }

    public getCurrentModuleIdentifier(module: ModuleName): ts.Identifier {
        return this._getModuleIdentifier(this._fileName, module);
    }

    public getTopStatementsForFile(sourceFile: ts.SourceFile): ts.Statement[] {
        return [...this._getImportsToAddInFile(sourceFile), ...this._getExportsToAddInFile(sourceFile)];
    }

    public initFile(sourceFile: ts.SourceFile): void {
        this._factoryRegistrationsPerFile[sourceFile.fileName] = [];
    }

    public getMockFactory(declaration: ts.Declaration): ts.Expression {
        const thisFileName: string = this._fileName;

        this.setTsAutoMockImportIdentifier();

        const key: string = this._getMockFactoryId(thisFileName, declaration);

        return ts.createCall(
            ts.createPropertyAccess(
                this._mockRepositoryAccess(thisFileName),
                ts.createIdentifier('getFactory'),
            ),
            [],
            [ts.createStringLiteral(key)],
        );
    }

    public getDeclarationKeyMap(typeMocked: ts.Declaration): string {
        if (!this._factoryCache.hasDeclarationKeyMap(typeMocked)) {
            this._factoryCache.setDeclarationKeyMap(typeMocked, this._factoryCache.createUniqueKeyForFactory(typeMocked));
        }

        return this._factoryCache.getDeclarationKeyMap(typeMocked);
    }

    public hasDeclarationKeyMap(type: ts.Declaration): boolean {
        return this._factoryCache.hasDeclarationKeyMap(type);
    }

    private _createUniqueFileName(name: string): ts.Identifier {
        return ts.createFileLevelUniqueName(`${urlSlug(this._fileName, '_')}_${name}`);
    }

    private _mockRepositoryAccess(filename: string): ts.Expression {
        const repository: ts.Identifier = this._getModuleIdentifier(filename, ModuleName.Repository);

        return ts.createPropertyAccess(
            ts.createPropertyAccess(
                repository,
                ts.createIdentifier('ɵRepository'),
            ),
            ts.createIdentifier('instance'),
        );
    }

    private _getModuleIdentifier(fileName: string, module: ModuleName): ts.Identifier {
        return this._neededImportIdentifierPerFile[fileName].find((moduleNameIdentifier: ModuleNameIdentifier) => {
            return moduleNameIdentifier.name === module;
        }).identifier;
    }

    private _getMockFactoryId(thisFileName: string, declaration: ts.Declaration): string {
        if (this._factoryCache.hasFactoryForTypeMock(declaration)) {
            return this._factoryCache.getFactoryKeyForTypeMock(declaration);
        }

        this._factoryCache.setFactoryKeyForTypeMock(
            declaration,
        );

        this._factoryRegistrationsPerFile[thisFileName] = this._factoryRegistrationsPerFile[thisFileName] || [];

        const descriptor: ts.Expression = GetPossibleDescriptor(declaration);

        const mockGenericVariable: ts.ParameterDeclaration = ts.createParameter([], [], undefined, MockGenericParameter);
        this._factoryRegistrationsPerFile[thisFileName].push({
            key: declaration,
            factory: ts.createFunctionExpression(undefined, undefined, undefined, undefined, [mockGenericVariable], undefined,
                ts.createBlock(
                    [ts.createReturn(descriptor)],
                ),
            ),
        });

        return this._factoryCache.getFactoryKeyForTypeMock(declaration);
    }

    private _getImportsToAddInFile(sourceFile: ts.SourceFile): ts.Statement[] {
        if (this._neededImportIdentifierPerFile[sourceFile.fileName]) {
            return this._neededImportIdentifierPerFile[sourceFile.fileName].map((moduleIdentifier: ModuleNameIdentifier) => {
                return createImportOnIdentifier(moduleIdentifier.moduleUrl, moduleIdentifier.identifier);
            });
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
