import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypescriptHelper } from '../helper/helper';
export type ImportNode = ts.ImportClause | ts.ImportSpecifier;
export function GetTypeImport(node: ImportNode): ts.Node {
	return TypescriptHelper.GetDeclarationForImport(node);
}