import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromDeclarations } from '../mock/mockProperties';
import { GetTypeQueryDescriptorFromDeclaration } from '../typeQuery/typeQuery';

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

  const typeChecker: ts.TypeChecker = TypeChecker();
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
  return ts.isSourceFile(declaration) || ts.isModuleDeclaration(declaration);
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
  const typeChecker: ts.TypeChecker = TypeChecker();
  const moduleExports: ts.Symbol[] = typeChecker.getExportsOfModule(symbol);

  return moduleExports
    .map(
      (prop: ts.Symbol): ModuleExportsDeclarations => {
        const originalSymbol: ts.Symbol = TypescriptHelper.GetAliasedSymbolSafe(
          prop
        );
        const originalDeclaration: ts.NamedDeclaration =
          originalSymbol?.declarations?.[0];
        const declaration: ts.Declaration = prop?.declarations?.[0];

        return {
          declaration,
          originalDeclaration,
        };
      }
    )
    .filter(
      (d: ModuleExportsDeclarations) => !!d.originalDeclaration && d.declaration
    )
    .map(
      (d: ModuleExportsDeclarations): ts.PropertySignature => {
        if (ts.isExportAssignment(d.declaration)) {
          return TypescriptCreator.createPropertySignature(
            'default',
            ts.createTypeQueryNode(d.originalDeclaration.name as ts.Identifier)
          );
        }

        if (
          ts.isExportSpecifier(d.declaration) &&
          ts.isSourceFile(d.originalDeclaration)
        ) {
          const exportSpecifierSymbol:
            | ts.Symbol
            | undefined = typeChecker.getSymbolAtLocation(d.declaration.name);

          if (!exportSpecifierSymbol) {
            throw new Error(
              `The type checker failed to look up symbol for \`${d.declaration.name.getText()}'.`
            );
          }

          const exportSpecifierAliasSymbol: ts.Symbol = typeChecker.getAliasedSymbol(
            exportSpecifierSymbol
          );
          const exportSpecifierProperties: ts.PropertySignature[] = GetPropertiesFromSourceFileOrModuleDeclaration(
            exportSpecifierAliasSymbol,
            scope
          );
          const propertyType: ts.TypeNode = ts.createTypeLiteralNode(
            exportSpecifierProperties
          );

          return TypescriptCreator.createPropertySignature(
            d.declaration.name,
            propertyType
          );
        }

        return TypescriptCreator.createPropertySignature(
          (d.originalDeclaration.name as ts.Identifier) ||
            ts.createIdentifier('default'),
          ts.createTypeQueryNode(d.originalDeclaration.name as ts.Identifier)
        );
      }
    );
}
