import * as ts from 'typescript';
import { TypeChecker } from "../typeChecker/typeChecker";
import { TypeScriptTypes, TypeScriptTypesFolder } from "../typescriptTypes/typescriptTypes";
import { TypescriptTypesAdapter } from "../typescriptTypes/typescriptTypesAdapter";

type Declaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export namespace TypescriptHelper {
	export function createGetAccessor(name: ts.PropertyName, block: ts.Block): ts.GetAccessorDeclaration {
		return ts.createGetAccessor([], [], name, [], undefined, block)
	}

    export function createSetAccessor(name: ts.PropertyName, block: ts.Block): ts.SetAccessorDeclaration {
        const nameIdentifier = "_" + (name as ts.Identifier).escapedText;
	    const parameterDeclaration = ts.createParameter([], [], undefined, nameIdentifier, undefined, undefined, undefined);
        return ts.createSetAccessor([], [], name, [parameterDeclaration], block);
    }

    export function createArrowFunction(block: ts.Block): ts.ArrowFunction {
	    return ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
    }

    export function createFunctionExpression(block: ts.Block, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
        return ts.createFunctionExpression([], null, undefined, [], parameter, undefined, block);
    }

    export function createEmptyFunctionExpression(): ts.FunctionExpression {
        const block = ts.createBlock([]);
        return createFunctionExpression(block);
    }

    export function findParameterOfNode(node: ts.EntityName): ts.NodeArray<ts.TypeParameterDeclaration> {
        const typeChecker = TypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(node);
        const declaration = symbol.declarations[0];

        if (declaration.kind === ts.SyntaxKind.ImportSpecifier) {
            const type = typeChecker.getDeclaredTypeOfSymbol(symbol);
            return (type.symbol.declarations[0] as Declaration).typeParameters;
        }

        return (symbol.declarations[0] as Declaration).typeParameters;
    }

    export function isTypescriptType(node: ts.Node): boolean {
        const fileName = node.getSourceFile().fileName;

        return fileName.includes(TypeScriptTypesFolder);
    }

    export function getTypescriptType(node: ts.Node): ts.Expression {
        const type = TypeChecker().getTypeAtLocation(node);

        return TypescriptTypesAdapter(TypeScriptTypes[type.symbol.name])
    }
}