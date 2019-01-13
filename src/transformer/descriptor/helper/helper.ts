import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

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
	
	export function createEmptyProperty(): ts.PropertyDeclaration {
		return ts.createProperty([], [], "", undefined, undefined, undefined);
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
    
    export function IsLiteralOrPrimitive(typeNode: ts.Node) {
		return ts.isLiteralTypeNode(typeNode) ||
			typeNode.kind === ts.SyntaxKind.StringKeyword ||
			typeNode.kind === ts.SyntaxKind.BooleanKeyword ||
			typeNode.kind === ts.SyntaxKind.NumberKeyword ||
			typeNode.kind === ts.SyntaxKind.ArrayType;
	}
}