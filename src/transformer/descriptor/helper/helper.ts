import type * as ts from 'typescript';
import { createNodeArray } from '../../../typescriptFactory/typescriptFactory';
import { core } from '../../core/core';

type Declaration =
  | ts.InterfaceDeclaration
  | ts.ClassDeclaration
  | ts.TypeAliasDeclaration;

type ImportDeclaration =
  | ts.ImportEqualsDeclaration
  | ts.ImportOrExportSpecifier
  | ts.ImportClause;

export namespace TypescriptHelper {
  export function IsLiteralOrPrimitive(typeNode: ts.Node): boolean {
    return (
      core.ts.isLiteralTypeNode(typeNode) ||
      typeNode.kind === core.ts.SyntaxKind.StringKeyword ||
      typeNode.kind === core.ts.SyntaxKind.BooleanKeyword ||
      typeNode.kind === core.ts.SyntaxKind.NumberKeyword ||
      typeNode.kind === core.ts.SyntaxKind.ArrayType
    );
  }

  export function GetDeclarationFromNode(node: ts.Node): ts.Declaration {
    const typeChecker: ts.TypeChecker = core.typeChecker;
    const symbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(node);

    if (!symbol) {
      throw new Error(
        `The type checker failed to look up a symbol for \`${node.getText()}'. 
        Perhaps, the checker was searching an outdated source.`,
      );
    }

    return GetDeclarationFromSymbol(symbol);
  }

  export function GetDeclarationFromSymbol(symbol: ts.Symbol): ts.Declaration {
    const declarations: ts.Declaration[] | undefined = symbol.declarations;

    if (!declarations) {
      throw new Error(
        `Failed to look up declarations for \`${symbol.getName()}'.`,
      );
    }

    const declaration: ts.Declaration = GetFirstValidDeclaration(declarations);

    if (isImportExportDeclaration(declaration)) {
      return GetDeclarationForImport(declaration);
    }

    return declaration;
  }

  export function GetConcreteDeclarationFromSymbol(
    symbol: ts.Symbol,
  ): ts.Declaration {
    const declarations: ts.Declaration[] | undefined = symbol.declarations;

    if (!declarations) {
      throw new Error(
        `Failed to look up declarations for \`${symbol.getName()}'.`,
      );
    }

    const declaration: ts.Declaration = declarations[0];

    if (isImportExportDeclaration(declaration)) {
      return GetConcreteDeclarationForImport(declaration);
    }

    return declaration;
  }

  export function GetDeclarationForImport(
    node: ImportDeclaration,
  ): ts.Declaration {
    const declarations: ts.Declaration[] = GetDeclarationsForImport(node);

    return GetFirstValidDeclaration(declarations);
  }

  export function GetConcreteDeclarationForImport(
    node: ImportDeclaration,
  ): ts.Declaration {
    const declarations: ts.Declaration[] = GetDeclarationsForImport(node);

    return declarations[0];
  }

  export function GetParameterOfNode(
    node: ts.EntityName,
  ): ts.NodeArray<ts.TypeParameterDeclaration> {
    const declaration: ts.Declaration = GetDeclarationFromNode(node);

    const { typeParameters = createNodeArray([]) }: Declaration =
      declaration as Declaration;

    return typeParameters;
  }

  export function GetTypeParameterOwnerMock(
    declaration: ts.Declaration,
  ): ts.Declaration | undefined {
    const typeDeclaration: ts.Declaration | undefined =
      core.ts.getTypeParameterOwner(declaration);

    // THIS IS TO FIX A MISSING IMPLEMENTATION IN TYPESCRIPT https://github.com/microsoft/TypeScript/blob/ba5e86f1406f39e89d56d4b32fd6ff8de09a0bf3/src/compiler/utilities.ts#L5138
    if (typeDeclaration && (typeDeclaration as Declaration).typeParameters) {
      return typeDeclaration;
    }

    for (
      let current: ts.Node = declaration;
      current;
      current = current.parent
    ) {
      if (current.kind === core.ts.SyntaxKind.TypeAliasDeclaration) {
        return current as ts.Declaration;
      }
    }
  }

  export function GetStringPropertyName(propertyName: ts.PropertyName): string {
    if (!core.ts.isComputedPropertyName(propertyName)) {
      return propertyName.text;
    }

    const symbol: ts.Symbol | undefined =
      core.typeChecker.getSymbolAtLocation(propertyName);

    if (!symbol) {
      throw new Error(
        `The type checker failed to look up symbol for property: ${propertyName.getText()}.`,
      );
    }

    return symbol.escapedName.toString();
  }

  export function GetAliasedSymbolSafe(alias: ts.Symbol): ts.Symbol {
    return isAlias(alias) ? core.typeChecker.getAliasedSymbol(alias) : alias;
  }

  export function getSignatureOfCallExpression(
    node: ts.CallExpression,
  ): ts.Signature | undefined {
    return core.typeChecker.getResolvedSignature(node);
  }

  export function hasTypeArguments(node: ts.CallExpression): boolean {
    return (
      typeof node.typeArguments !== 'undefined' && !!node.typeArguments.length
    );
  }

  function GetFirstValidDeclaration(
    declarations: ts.Declaration[],
  ): ts.Declaration {
    return (
      declarations.find(
        (declaration: ts.Declaration) =>
          !core.ts.isVariableDeclaration(declaration) &&
          !core.ts.isFunctionDeclaration(declaration) &&
          !core.ts.isModuleDeclaration(declaration),
      ) || declarations[0]
    );
  }

  function isAlias(symbol: ts.Symbol): boolean {
    return !!(
      symbol.flags & core.ts.SymbolFlags.Alias ||
      symbol.flags & core.ts.SymbolFlags.AliasExcludes
    );
  }

  function isImportExportDeclaration(
    declaration: ts.Declaration,
  ): declaration is ImportDeclaration {
    return (
      core.ts.isImportEqualsDeclaration(declaration) ||
      core.ts.isImportOrExportSpecifier(declaration) ||
      core.ts.isImportClause(declaration)
    );
  }

  function GetDeclarationsForImport(node: ImportDeclaration): ts.Declaration[] {
    const typeChecker: ts.TypeChecker = core.typeChecker;
    const symbol: ts.Symbol | undefined =
      node.name && typeChecker.getSymbolAtLocation(node.name);
    const originalSymbol: ts.Symbol | undefined =
      symbol && typeChecker.getAliasedSymbol(symbol);

    return originalSymbol?.declarations ?? [];
  }
}
