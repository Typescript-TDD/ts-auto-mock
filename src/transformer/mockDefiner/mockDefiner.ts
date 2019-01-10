import * as ts from 'typescript';
import * as urlSlug from 'url-slug';
import { ExportWithIdentifier, createFactoryExport } from '../helper/export';
import { TypeChecker } from '../typeChecker/typeChecker';
import { GetDescriptorForMock } from '../descriptor/descriptor';
import { createImport } from '../helper/import';

interface ImportDefinition {
	filepath: string;
	name: string;
}

export class MockDefiner {
	private _cache: Map<ts.Node, ImportDefinition>;
	private _exportList: Map<string, ExportWithIdentifier[]>;
	private _exportMap: Map<string, Map<string, number>>;
	private _importList: Map<string, ts.ImportDeclaration[]>;
	private _typeChecker: ts.TypeChecker;
	private _isAlreadyMocked: (d: ts.Declaration, sf: ts.SourceFile) => boolean;
	private _isImportEnabled: boolean;

	private static _instance: MockDefiner;

	public static get instance(): MockDefiner {
		this._instance = this._instance || new MockDefiner();
		return this._instance;
	}

	private constructor() {
		this._cache = new Map<ts.Node, ImportDefinition>();
		this._exportList = new Map<string, ExportWithIdentifier[]>();
		this._exportMap = new Map<string, Map<string, number>>();
		this._importList = new Map<string, ts.ImportDeclaration[]>();
		this._typeChecker = TypeChecker();
		this.enableImportBetweenFiles();
	}

	public disableImportBetweenFiles(): void {
		this._isAlreadyMocked = this._isAlreadyMockedImportDisabled;
		this._isImportEnabled = false;
	}

	public enableImportBetweenFiles(): void {
		this._isAlreadyMocked = this._isAlreadyMockedImportEnabled;
		this._isImportEnabled = true;
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

		if (this._isAlreadyMocked(declaration, thisFile)) {
			return this._getFactoryReferenceFromCache(thisFileName, type, declaration);
		} else {
			return this._generateExportedFactoryInCache(thisFileName, type, declaration);
		}
	}

	public isTypeFactoryInFile(declaration: ts.Declaration, sourceFile: ts.SourceFile): boolean {
		return this._cache.has(declaration) && this._cache.get(declaration).filepath === sourceFile.fileName;
	}

	public getTypeFactoryName(declaration: ts.Declaration): string {
		return this._cache.get(declaration).name;
	}

	private _getImportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.ImportDeclaration> {
		if (!this._isImportEnabled) {
			return [];
		}

		return this._importList.get(sourceFile.fileName) || [];
	}

	private _getExportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.FunctionDeclaration> {
		return (this._exportList.get(sourceFile.fileName) || []).map((x) => x.exportDeclaration);
	}

	private _isAlreadyMockedImportEnabled(declaration: ts.Declaration, sourceFile: ts.SourceFile) {
		return this._cache.has(declaration);
	}

	private _isAlreadyMockedImportDisabled(declaration: ts.Declaration, sourceFile: ts.SourceFile) {
		return this.isTypeFactoryInFile(declaration, sourceFile);
	}

	private _getFactoryReferenceFromCache(fileWhereToUseFactory: string, typeToMock: ts.TypeReferenceNode, key: ts.Declaration) {
		if (this.isTypeFactoryInFile(key, typeToMock.getSourceFile())) {
			return ts.createIdentifier(this.getTypeFactoryName(key));
		} else {
			const factoryImport = createImport(this._cache.get(key).filepath);
			if (this._importList.has(fileWhereToUseFactory)) {
				this._importList.get(fileWhereToUseFactory).push(factoryImport.importDeclaration);
			} else {
				this._importList.set(fileWhereToUseFactory, [ factoryImport.importDeclaration ]);
			}

			return ts.createPropertyAccess(factoryImport.identifier, this.getTypeFactoryName(key));
		}
	}

	private _generateExportedFactoryInCache(fileWhereToGenerateFactory: string, typeToMock: ts.TypeReferenceNode, key: ts.Declaration) {
		const factoryName: string = this._createUniqueFactoryName(
			fileWhereToGenerateFactory,
			this._typeChecker.typeToString(this._typeChecker.getTypeFromTypeNode(typeToMock))
		);

		const newFactory = createFactoryExport(factoryName, GetDescriptorForMock(typeToMock));
		if (this._exportList.has(fileWhereToGenerateFactory)) {
			this._exportList.get(fileWhereToGenerateFactory).push(newFactory);
		} else {
			this._exportList.set(fileWhereToGenerateFactory, [ newFactory ]);
		}
		this._cache.set(key, { name: factoryName, filepath: typeToMock.getSourceFile().fileName });

		return newFactory.identifier;
	}

	private _createUniqueFactoryName(thisFileName: string, typeName: string) {
	    const typeNameSanitized = urlSlug(typeName, "_");
		if (!this._exportMap.has(thisFileName)) {
			this._exportMap.set(thisFileName, new Map<string, number>());
		}
		const baseFactoryName = 'create__' + typeNameSanitized + '__mock';
		const count = this._exportMap.get(thisFileName).get(baseFactoryName) || 1;
		this._exportMap.get(thisFileName).set(baseFactoryName, count + 1);

		return `${baseFactoryName}_${count}`;
	}
}
