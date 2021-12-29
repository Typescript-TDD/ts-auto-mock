import type * as ts from 'typescript';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetMockFactoryCallTypeofEnum } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMethodDeclarationDescriptor } from '../method/methodDeclaration';
import {
  GetModuleDescriptor,
  GetPropertiesFromSourceFileOrModuleDeclaration,
} from '../module/module';
import { GetNullDescriptor } from '../null/null';
import { GetType } from '../type/type';
import { GetTypeReferenceDescriptor } from '../typeReference/typeReference';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { GetMockPropertiesFromDeclarations } from '../mock/mockProperties';
import {
  createFunctionExpressionReturn,
  createTypeReferenceNode,
} from '../../../typescriptFactory/typescriptFactory';

export function GetTypeQueryDescriptor(
  node: ts.TypeQueryNode,
  scope: Scope
): ts.Expression {
  const symbol: ts.Symbol | undefined = getTypeQuerySymbol(node);

  if (!symbol?.declarations?.length) {
    return GetUndefinedDescriptor();
  }

  const declaration: ts.NamedDeclaration =
    getTypeQueryDeclarationFromSymbol(symbol);

  return GetTypeQueryDescriptorFromDeclaration(declaration, scope);
}

export function GetTypeQueryDescriptorFromDeclaration(
  declaration: ts.NamedDeclaration,
  scope: Scope
): ts.Expression {
  const typeChecker: ts.TypeChecker = core.typeChecker;

  switch (declaration.kind) {
    case core.ts.SyntaxKind.ClassDeclaration:
      return createFunctionExpressionReturn(
        GetTypeReferenceDescriptor(
          createTypeReferenceNode(declaration.name as ts.Identifier),
          scope
        )
      );
    case core.ts.SyntaxKind.TypeAliasDeclaration:
    case core.ts.SyntaxKind.InterfaceDeclaration:
      return GetTypeReferenceDescriptor(
        createTypeReferenceNode(declaration.name as ts.Identifier),
        scope
      );
    // NamespaceImport, ImportEqualsDeclaration and ModuleDeclaration cannot be used in a typeof
    // but to test definitely typed this is the only way, eventually we should move this code in the definitely typed folder
    // and use it using an eventual extensibility opening of this transformer
    case core.ts.SyntaxKind.NamespaceImport:
    case core.ts.SyntaxKind.ImportEqualsDeclaration:
      return GetModuleDescriptor(declaration, scope);
    case core.ts.SyntaxKind.ModuleDeclaration:
      return GetMockPropertiesFromDeclarations(
        GetPropertiesFromSourceFileOrModuleDeclaration(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (declaration as any).symbol as ts.Symbol,
          scope
        ),
        [],
        scope
      );
    case core.ts.SyntaxKind.EnumDeclaration:
      // TODO: Use following two lines when issue #17552 on typescript github is resolved (https://github.com/microsoft/TypeScript/issues/17552)
      // TheNewEmitResolver.ensureEmitOf(GetImportDeclarationOf(node.eprName as ts.Identifier);
      // return node.exprName as ts.Identifier;
      return GetMockFactoryCallTypeofEnum(
        declaration as ts.EnumDeclaration,
        scope
      );
    case core.ts.SyntaxKind.FunctionDeclaration:
    case core.ts.SyntaxKind.MethodSignature:
      return GetMethodDeclarationDescriptor(
        declaration as ts.FunctionDeclaration,
        scope
      );
    case core.ts.SyntaxKind.VariableDeclaration:
      const variable: ts.VariableDeclaration =
        declaration as ts.VariableDeclaration;

      if (variable.type) {
        return GetDescriptor(variable.type, scope);
      }

      if (!variable.initializer) {
        throw new Error(
          `The transformer cannot determine a value for \`${variable.getText()}' without a specified type or no initializer value.`
        );
      }

      const inferredType: ts.Node = GetType(variable.initializer, scope);
      const symbol: ts.Symbol | undefined =
        typeChecker.getSymbolAtLocation(inferredType);

      if (symbol) {
        const inferredTypeDeclaration: ts.NamedDeclaration =
          getTypeQueryDeclarationFromSymbol(symbol);

        return GetTypeQueryDescriptorFromDeclaration(
          inferredTypeDeclaration,
          scope
        );
      } else {
        return GetDescriptor(inferredType, scope);
      }
    default:
      TransformerLogger().typeNotSupported(
        `TypeQuery of ${core.ts.SyntaxKind[declaration.kind]}`,
        declaration
      );
      return GetNullDescriptor();
  }
}

function getTypeQuerySymbol(node: ts.TypeQueryNode): ts.Symbol | undefined {
  return core.typeChecker.getSymbolAtLocation(node.exprName);
}

function getTypeQueryDeclarationFromSymbol(
  symbol: ts.Symbol
): ts.NamedDeclaration {
  const declaration: ts.Declaration | undefined = symbol.declarations?.[0];

  if (!declaration) {
    throw new Error(
      `Failed to look up declaration for \`${symbol.getName()}'.`
    );
  }

  if (core.ts.isImportEqualsDeclaration(declaration)) {
    return declaration;
  }

  return TypescriptHelper.GetConcreteDeclarationFromSymbol(symbol);
}
