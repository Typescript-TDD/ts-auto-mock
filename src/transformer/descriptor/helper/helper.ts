import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';

type Declaration = ts.InterfaceDeclaration | ts.ClassDeclaration | ts.TypeAliasDeclaration;

type ImportDeclaration = ts.ImportEqualsDeclaration | ts.ImportOrExportSpecifier | ts.ImportClause;

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
    const symbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(node);

    if (!symbol) {
      throw new Error(
        `The type checker failed to look up a symbol for \`${node.getText()}'. ` +
          'Perhaps, the checker was searching an outdated source.',
      );
    }

    return GetDeclarationFromSymbol(symbol);
  }

  export function GetDeclarationFromSymbol(symbol: ts.Symbol): ts.Declaration {
    const declaration: ts.Declaration = GetFirstValidDeclaration(symbol.declarations);

    if (isImportExportDeclaration(declaration)) {
      return GetDeclarationForImport(declaration);
    }

    return declaration;
  }

  export function GetConcreteDeclarationFromSymbol(symbol: ts.Symbol): ts.Declaration {
    const declaration: ts.Declaration = symbol.declarations[0];

    if (isImportExportDeclaration(declaration)) {
      return GetConcreteDeclarationForImport(declaration);
    }

    return declaration;
  }

  export function GetDeclarationForImport(node: ImportDeclaration): ts.Declaration {
    const declarations: ts.Declaration[] = GetDeclarationsForImport(node);

    return GetFirstValidDeclaration(declarations);
  }

  export function GetConcreteDeclarationForImport(node: ImportDeclaration): ts.Declaration {
    const declarations: ts.Declaration[] = GetDeclarationsForImport(node);

    return declarations[0];
  }

  export function GetParameterOfNode(node: ts.EntityName): ts.NodeArray<ts.TypeParameterDeclaration> {
    const declaration: ts.Declaration = GetDeclarationFromNode(node);

    const { typeParameters = ts.createNodeArray([]) }: Declaration = (declaration as Declaration);

    return typeParameters;
  }

  export function GetTypeParameterOwnerMock(declaration: ts.Declaration): ts.Declaration | undefined {
    const typeDeclaration: ts.Declaration | undefined = ts.getTypeParameterOwner(declaration);

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

    const symbol: ts.Symbol | undefined = TypeChecker().getSymbolAtLocation(propertyName);

    if (!symbol) {
      throw new Error(
        `The type checker failed to look up symbol for property: ${propertyName.getText()}.`,
      );
    }

    return symbol.escapedName.toString();
  }

  export function GetAliasedSymbolSafe(alias: ts.Symbol): ts.Symbol {
    return isAlias(alias) ? TypeChecker().getAliasedSymbol(alias) : alias;
  }


  export function getSignatureOfCallExpression(node: ts.CallLikeExpression): ts.Signature | undefined {
    const typeChecker: ts.TypeChecker = TypeChecker();

    return typeChecker.getResolvedSignature(node);
  }

  function GetFirstValidDeclaration(declarations: ts.Declaration[]): ts.Declaration {
    return declarations.find((declaration: ts.Declaration) => !ts.isVariableDeclaration(declaration) && !ts.isFunctionDeclaration(declaration)) || declarations[0];
  }

  function isAlias(symbol: ts.Symbol): boolean {
    // eslint-disable-next-line no-bitwise
    return !!((symbol.flags & ts.SymbolFlags.Alias) || (symbol.flags & ts.SymbolFlags.AliasExcludes));
  }

  function isImportExportDeclaration(declaration: ts.Declaration): declaration is ImportDeclaration  {
    return ts.isImportEqualsDeclaration(declaration) || ts.isImportOrExportSpecifier(declaration) || ts.isImportClause(declaration);
  }

  function GetDeclarationsForImport(node: ImportDeclaration): ts.Declaration[] {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const symbol: ts.Symbol | undefined = node.name && typeChecker.getSymbolAtLocation(node.name);
    const originalSymbol: ts.Symbol | undefined = symbol && typeChecker.getAliasedSymbol(symbol);

    return originalSymbol?.declarations ?? [];
  }
}
