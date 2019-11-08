import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';

type Declaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

export namespace TypescriptHelper {
    export function IsLiteralOrPrimitive(typeNode: ts.Node): boolean {
        return ts.isLiteralTypeNode(typeNode) ||
            typeNode.kind === ts.SyntaxKind.StringKeyword ||
            typeNode.kind === ts.SyntaxKind.BooleanKeyword ||
            typeNode.kind === ts.SyntaxKind.NumberKeyword ||
            typeNode.kind === ts.SyntaxKind.ArrayType;
    }

    export function GetDeclarationFromNode(node: ts.Node): ts.Declaration {
        const typeChecker: ts.TypeChecker = TypeChecker();
        const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node);
        return symbol.declarations[0];
    }

    export function GetDeclarationForImport(node: ts.ImportClause | ts.ImportSpecifier): ts.Node {
        const typeChecker: ts.TypeChecker = TypeChecker();
        const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.name);
        const declaredType: ts.Type = typeChecker.getDeclaredTypeOfSymbol(symbol);
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

    export function GetTypeParameterOwnerIndexOfType(typeNode: ts.TypeParameter): number {
        const declaration: ts.Declaration = typeNode.symbol.declarations[0];
        const typeDeclaration: ts.Declaration = ts.getTypeParameterOwner(declaration);

        return (typeDeclaration as Declaration).typeParameters.findIndex((tp: ts.TypeParameterDeclaration) => {
            return tp.name === (declaration as ts.TypeParameterDeclaration).name;
        });
    }
}
