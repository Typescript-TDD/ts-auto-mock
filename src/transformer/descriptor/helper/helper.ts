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

        return GetDeclarationFromSymbol(symbol);
    }

    export function GetDeclarationFromSymbol(symbol: ts.Symbol): ts.Declaration {
        const declaration: ts.Declaration = GetFirstValidDeclaration(symbol.declarations);

        if (ts.isImportSpecifier(declaration) || ts.isImportEqualsDeclaration(declaration)) {
            return GetDeclarationForImport(declaration);
        }

        return declaration;
    }

    export function GetConcreteDeclarationFromSymbol(symbol: ts.Symbol): ts.Declaration {
        const declaration: ts.Declaration = symbol.declarations[0];

        if (ts.isImportSpecifier(declaration) || ts.isImportEqualsDeclaration(declaration)) {
            return GetConcreteDeclarationForImport(declaration);
        }

        return declaration;
    }

    export function GetDeclarationForImport(node: ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration): ts.Declaration {
        const typeChecker: ts.TypeChecker = TypeChecker();
        const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.name);
        const originalSymbol: ts.Symbol = typeChecker.getAliasedSymbol(symbol);

        return GetFirstValidDeclaration(originalSymbol.declarations);
    }

    export function GetConcreteDeclarationForImport(node: ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration): ts.Declaration {
        const typeChecker: ts.TypeChecker = TypeChecker();
        const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.name);
        const originalSymbol: ts.Symbol = typeChecker.getAliasedSymbol(symbol);

        return originalSymbol.declarations[0];
    }

    export function GetParameterOfNode(node: ts.EntityName): ts.NodeArray<ts.TypeParameterDeclaration> {
        const declaration: ts.Declaration = GetDeclarationFromNode(node);

        return (declaration as Declaration).typeParameters;
    }

    export function GetTypeParameterOwnerMock(declaration: ts.Declaration): ts.Declaration {
        const typeDeclaration: ts.Declaration = ts.getTypeParameterOwner(declaration);

        // THIS IS TO FIX A MISSING IMPLEMENTATION IN TYPESCRIPT https://github.com/microsoft/TypeScript/blob/ba5e86f1406f39e89d56d4b32fd6ff8de09a0bf3/src/compiler/utilities.ts#L5138
        if (typeDeclaration && (typeDeclaration as Declaration).typeParameters) {
            return typeDeclaration;
        }

        for (let current: ts.Node = declaration; current; current = current.parent) {
            if (current.kind === ts.SyntaxKind.TypeAliasDeclaration) {
                return current as ts.Declaration;
            }
        }
    }

    export function GetStringPropertyName(propertyName: ts.PropertyName): string {
        if (!ts.isComputedPropertyName(propertyName)) {
            return propertyName.text;
        }

        const symbol: ts.Symbol = TypeChecker().getSymbolAtLocation(propertyName);
        return symbol.escapedName.toString();
    }

    export function GetAliasedSymbolSafe(alias: ts.Symbol): ts.Symbol {
        return isAlias(alias) ? TypeChecker().getAliasedSymbol(alias) : alias;
    }

    function GetFirstValidDeclaration(declarations: ts.Declaration[]): ts.Declaration {
        return declarations.find((declaration: ts.Declaration) => {
            return !ts.isVariableDeclaration(declaration) && !ts.isFunctionDeclaration(declaration);
        }) || declarations[0];
    }

    function isAlias(symbol: ts.Symbol): boolean {
        // tslint:disable-next-line no-bitwise
        return !!((symbol.flags & ts.SymbolFlags.Alias) || (symbol.flags & ts.SymbolFlags.AliasExcludes));
    }
}
