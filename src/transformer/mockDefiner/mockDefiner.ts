import * as ts from 'typescript';
import * as urlslug from 'url-slug';
import { TypeChecker } from '../typeChecker/typeChecker';
import { GetDescriptorForMock } from '../descriptor/descriptor';
import { createImportOnIdentifier } from '../helper/import';
import { FactoryDefinitionCache } from './factoryDefinitionCache';

export class MockDefiner {
	private _typeChecker: ts.TypeChecker;
	private _neededImportIdentifierPerFile: { [key: string]: ts.Identifier } = {};
	private _factoryRegistrationsPerFile: { [key: string]: Array<{ key: ts.Declaration; factory: ts.Expression }> } = {};
	private _factoryCache: FactoryDefinitionCache;

	private static _instance: MockDefiner;
    public currentTsAutoMockImportName: ts.Identifier;

    public static get instance(): MockDefiner {
		this._instance = this._instance || new MockDefiner();
		return this._instance;
	}

	private constructor() {
		this._factoryCache = new FactoryDefinitionCache();
		this._typeChecker = TypeChecker();
	}

	public getTopStatementsForFile(sourceFile: ts.SourceFile): Array<ts.Statement> {
		return [...this._getImportsToAddInFile(sourceFile), ...this._getExportsToAddInFile(sourceFile)];
	}

	public generateFactoryIfNeeded(type: ts.TypeReferenceNode): ts.Expression {
		this._typeChecker = TypeChecker();
		const symbol = this._typeChecker.getSymbolAtLocation(type.typeName);
		const declaredType = this._typeChecker.getDeclaredTypeOfSymbol(symbol);
		const declaration = declaredType.symbol.declarations[0];
		const thisFile = type.getSourceFile();
		const thisFileName = thisFile.fileName;

		if (!this._neededImportIdentifierPerFile[thisFileName]) {
			this._neededImportIdentifierPerFile[thisFileName] = ts.createFileLevelUniqueName(`${urlslug(thisFileName, '_')}_repository`);
            this.currentTsAutoMockImportName = this._neededImportIdentifierPerFile[thisFileName];
		}

		const key = this._registerIfNeeded(thisFileName, type, declaration);

		return ts.createCall(
			ts.createPropertyAccess(
				this._mockRepositoryAccess(thisFileName),
				ts.createIdentifier('getFactory')
			),
			[],
			[ts.createStringLiteral(key)]
		);
	}

	private _mockRepositoryAccess(filename: string): ts.Expression {
		return ts.createPropertyAccess(
			ts.createPropertyAccess(
				this._neededImportIdentifierPerFile[filename],
				ts.createIdentifier('MockRepository')
			),
			ts.createIdentifier('instance')
		);
	}

	private _registerIfNeeded(thisFileName: string, type: ts.TypeReferenceNode, declaration: ts.Declaration): string {
		if(this._factoryCache.hasFactoryForTypeMock(declaration)) {
			return this._factoryCache.getFactoryKeyForTypeMock(declaration);
		}

		this._factoryCache.setFactoryKeyForTypeMock(
			declaration,
			this._factoryCache.createUniqueKeyForFactory(declaration)
		);

		this._factoryRegistrationsPerFile[thisFileName] = this._factoryRegistrationsPerFile[thisFileName] || [];

		this._factoryRegistrationsPerFile[thisFileName].push({
			key: declaration,
			factory: ts.createFunctionExpression(undefined, undefined, undefined, undefined, [], undefined,
				ts.createBlock(
					[ts.createReturn(GetDescriptorForMock(type))]
				)
			)
		});

		return this._factoryCache.getFactoryKeyForTypeMock(declaration);
	}

	private _getImportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.Statement> {
		if (this._neededImportIdentifierPerFile[sourceFile.fileName]) {
			return [createImportOnIdentifier('ts-auto-mock', this._neededImportIdentifierPerFile[sourceFile.fileName])];
		}

		return [];
	}

	private _getExportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.Statement> {
		if (this._factoryRegistrationsPerFile[sourceFile.fileName]) {
			return this._factoryRegistrationsPerFile[sourceFile.fileName]
				.map(reg => this._createRegistration(sourceFile.fileName, reg.key, reg.factory));
		}

		return [];
	}

	private _createRegistration(filename: string, key: ts.Declaration, factory: ts.Expression): ts.Statement {
		return ts.createExpressionStatement(
			ts.createCall(
				ts.createPropertyAccess(
					this._mockRepositoryAccess(filename),
					ts.createIdentifier('registerFactory')
				),
				[],
				[ts.createStringLiteral(this._factoryCache.getFactoryKeyForTypeMock(key)), factory]
			)
		);
	}
}
