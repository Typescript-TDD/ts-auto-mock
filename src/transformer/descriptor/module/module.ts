import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromDeclarations } from '../mock/mockProperties';
import { GetTypeQueryDescriptorFromDeclaration } from '../typeQuery/typeQuery';
import {
  createIdentifier,
  createPropertySignature,
  createTypeLiteralNode,
  createTypeQueryNode,
} from '../../../typescriptFactory/typescriptFactory';

type ExternalSource = ts.SourceFile | ts.ModuleDeclaration;

export function GetModuleDescriptor(
  node: ts.NamedDeclaration,
  scope: Scope
): ts.Expression {
  if (!node.name) {
    throw new Error(
      `Cannot look up symbol for a node without a name: ${node.getText()}.`
    );
  }

  const typeChecker: ts.TypeChecker = core.typeChecker;
  const symbolAlias: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(
    node.name
  );

  if (!symbolAlias) {
    throw new Error(
      `The type checker failed to look up symbol for \`${node.name.getText()}'.`
    );
  }

  const symbol: ts.Symbol = typeChecker.getAliasedSymbol(symbolAlias);
  const externalModuleDeclaration: ts.NamedDeclaration = symbol.declarations[0];

  if (isExternalSource(externalModuleDeclaration)) {
    return GetPropertiesFromSourceFileOrModuleDeclarationDescriptor(
      externalModuleDeclaration,
      symbol,
      scope
    );
  }

  return GetTypeQueryDescriptorFromDeclaration(
    externalModuleDeclaration,
    scope
  );
}

function isExternalSource(declaration: ts.Node): declaration is ExternalSource {
  return (
    core.ts.isSourceFile(declaration) ||
    core.ts.isModuleDeclaration(declaration)
  );
}

function GetPropertiesFromSourceFileOrModuleDeclarationDescriptor(
  sourceFile: ExternalSource,
  symbol: ts.Symbol,
  scope: Scope
): ts.Expression {
  return GetMockPropertiesFromDeclarations(
    GetPropertiesFromSourceFileOrModuleDeclaration(symbol, scope),
    [],
    scope
  );
}

interface ModuleExportsDeclarations {
  declaration: ts.Declaration;
  originalDeclaration: ts.NamedDeclaration;
}

export function GetPropertiesFromSourceFileOrModuleDeclaration(
  symbol: ts.Symbol,
  scope: Scope
): ts.PropertySignature[] {
  const typeChecker: ts.TypeChecker = core.typeChecker;
  const moduleExports: ts.Symbol[] = typeChecker.getExportsOfModule(symbol);

  return moduleExports
    .map((prop: ts.Symbol): ModuleExportsDeclarations => {
      const originalSymbol: ts.Symbol =
        TypescriptHelper.GetAliasedSymbolSafe(prop);
      const originalDeclaration: ts.NamedDeclaration =
        originalSymbol?.declarations?.[0];
      const declaration: ts.Declaration = prop?.declarations?.[0];

      return {
        declaration,
        originalDeclaration,
      };
    })
    .filter(
      (d: ModuleExportsDeclarations) => !!d.originalDeclaration && d.declaration
    )
    .map((d: ModuleExportsDeclarations): ts.PropertySignature => {
      if (core.ts.isExportAssignment(d.declaration)) {
        return createPropertySignature(
          'default',
          createTypeQueryNode(d.originalDeclaration.name as ts.Identifier)
        );
      }

      if (
        core.ts.isExportSpecifier(d.declaration) &&
        core.ts.isSourceFile(d.originalDeclaration)
      ) {
        const exportSpecifierSymbol: ts.Symbol | undefined =
          typeChecker.getSymbolAtLocation(d.declaration.name);

        if (!exportSpecifierSymbol) {
          throw new Error(
            `The type checker failed to look up symbol for \`${d.declaration.name.getText()}'.`
          );
        }

        const exportSpecifierAliasSymbol: ts.Symbol =
          typeChecker.getAliasedSymbol(exportSpecifierSymbol);
        const exportSpecifierProperties: ts.PropertySignature[] =
          GetPropertiesFromSourceFileOrModuleDeclaration(
            exportSpecifierAliasSymbol,
            scope
          );
        const propertyType: ts.TypeLiteralNode = createTypeLiteralNode(
          exportSpecifierProperties
        );

        return createPropertySignature(d.declaration.name, propertyType);
      }

      return createPropertySignature(
        (d.originalDeclaration.name as ts.Identifier) ||
          createIdentifier('default'),
        createTypeQueryNode(d.originalDeclaration.name as ts.Identifier)
      );
    });
}
