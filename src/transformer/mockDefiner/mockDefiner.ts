import * as ts from 'typescript';
import { ExportWithIdentifier, createFactoryExport } from '../helper/export';
import { GetTypeChecker } from '../getTypeChecker';
import { GetDescriptor } from '../descriptor/descriptor';
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
	}

	public getImportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.ImportDeclaration> {
		return this._importList.get(sourceFile.fileName) || [];
	}

	public getExportsToAddInFile(sourceFile: ts.SourceFile): Array<ts.FunctionDeclaration> {
		return (this._exportList.get(sourceFile.fileName) || []).map((x) => x.exportDeclaration);
	}

	public generateFactoryIfNeeded(type: ts.TypeReferenceNode): ts.Expression {
		const typeChecker = GetTypeChecker();
		const symbol = typeChecker.getSymbolAtLocation(type.typeName);
		const declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
		const declaration = declaredType.symbol.declarations[0];
		const thisFileName = type.getSourceFile().fileName;
		const key: ts.Declaration = declaration;

		if (!this._cache.has(key)) {
			const factoryName: string = this._createUniqueFactoryName(
				thisFileName,
				typeChecker.typeToString(typeChecker.getTypeFromTypeNode(type))
			);

			const newFactory = createFactoryExport(factoryName, GetDescriptor(type));
			if (this._exportList.has(thisFileName)) {
				this._exportList.get(thisFileName).push(newFactory);
			} else {
				this._exportList.set(thisFileName, [ newFactory ]);
			}
			this._cache.set(key, { name: factoryName, filepath: type.getSourceFile().fileName });

			return newFactory.identifier;
		} else {
			if (this.isTypeFactoryInFile(key, type.getSourceFile())) {
				return ts.createIdentifier(this.getTypeFactoryName(key));
			} else {
				const factoryImport = createImport(this._cache.get(key).filepath);
				if (this._importList.has(thisFileName)) {
					this._importList.get(thisFileName).push(factoryImport.importDeclaration);
				} else {
					this._importList.set(thisFileName, [ factoryImport.importDeclaration ]);
				}

				return ts.createPropertyAccess(factoryImport.identifier, this.getTypeFactoryName(key));
			}
		}
	}

	public isTypeFactoryInFile(declaration: ts.Declaration, sourceFile: ts.SourceFile) {
		return this._cache.has(declaration) && this._cache.get(declaration).filepath === sourceFile.fileName;
	}

	public getTypeFactoryName(declaration: ts.Declaration) {
		return this._cache.get(declaration).name;
	}

	private _createUniqueFactoryName(thisFileName: string, typeName: string) {
		if (!this._exportMap.has(thisFileName)) {
			this._exportMap.set(thisFileName, new Map<string, number>());
		}
		const baseFactoryName = 'create__' + typeName + '__mock';
		const count = this._exportMap.get(thisFileName).get(baseFactoryName) || 1;
		this._exportMap.get(thisFileName).set(baseFactoryName, count + 1);

		return `${baseFactoryName}_${count}`;
	}
}
