import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";

type Declaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export namespace TypescriptHelper {
	export function createGetAccessor(name: ts.PropertyName, block: ts.Block): ts.GetAccessorDeclaration {
		return ts.createGetAccessor([], [], name, [], undefined, block)
	}

    export function createSetAccessor(name: ts.PropertyName, block: ts.Block, parameterName: ts.Identifier): ts.SetAccessorDeclaration {
	    const parameterDeclaration = ts.createParameter([], [], undefined, parameterName, undefined, undefined, undefined);
        return ts.createSetAccessor([], [], name, [parameterDeclaration], block);
    }

    export function createArrowFunction(block: ts.Block): ts.ArrowFunction {
	    return ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
    }

    export function createFunctionExpression(block: ts.Block, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
        return ts.createFunctionExpression([], null, undefined, [], parameter, undefined, block);
    }
	
	export function createEmptyProperty(): ts.PropertyDeclaration {
		return createProperty("", undefined);
	}
	
	export function createProperty(propertyName: string, type: ts.TypeNode): ts.PropertyDeclaration {
		return ts.createProperty([], [], propertyName, undefined, type, undefined);
	}

    export function findParameterOfNode(node: ts.EntityName): ts.NodeArray<ts.TypeParameterDeclaration> {
        const declaration = GetDeclarationFromNode(node);

        if (declaration.kind === ts.SyntaxKind.ImportSpecifier) {
            const importDeclaration = GetDeclarationForImport(declaration as ts.ImportSpecifier);

            return (importDeclaration as Declaration).typeParameters;
        }

        return (declaration as Declaration).typeParameters;
    }
    
    export function IsLiteralOrPrimitive(typeNode: ts.Node) {
		return ts.isLiteralTypeNode(typeNode) ||
			typeNode.kind === ts.SyntaxKind.StringKeyword ||
			typeNode.kind === ts.SyntaxKind.BooleanKeyword ||
			typeNode.kind === ts.SyntaxKind.NumberKeyword ||
			typeNode.kind === ts.SyntaxKind.ArrayType;
    }
    
    export function GetDeclarationFromNode(node: ts.Node): ts.Declaration {
        const typeChecker = TypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(node);
        return symbol.declarations[0];
    }

    export function GetDeclarationForImport(node: ts.ImportClause | ts.ImportSpecifier): ts.Node {
        const typeChecker = TypeChecker();
        const symbol = typeChecker.getSymbolAtLocation(node.name);
        const declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
        return GetDeclarationFromType(declaredType);    
    }

    export function GetDeclarationFromType(type: ts.Type): ts.TypeNode | ts.Declaration {
        if (type.symbol && type.symbol.declarations) {
			return type.symbol.declarations[0];
		} else if (type.aliasSymbol && type.aliasSymbol.declarations) {
			return type.aliasSymbol.declarations[0];
        } 
        
		return TypeChecker().typeToTypeNode(type);
    
    }
}