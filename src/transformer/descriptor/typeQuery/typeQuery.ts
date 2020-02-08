import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetMockFactoryCallTypeofEnum } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMethodDeclarationDescriptor } from '../method/methodDeclaration';
import { GetModuleDescriptor } from '../module/module';
import { GetNullDescriptor } from '../null/null';
import { GetType } from '../type/type';
import { GetTypeReferenceDescriptor } from '../typeReference/typeReference';

export function GetTypeQueryDescriptor(node: ts.TypeQueryNode, scope: Scope): ts.Expression {
  const declaration: ts.NamedDeclaration = getTypeQueryDeclaration(node);
  return GetTypeQueryDescriptorFromDeclaration(declaration, scope);
}

export function GetTypeQueryDescriptorFromDeclaration(declaration: ts.NamedDeclaration, scope: Scope): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();

  switch (declaration.kind) {
    case ts.SyntaxKind.ClassDeclaration:
      return TypescriptCreator.createFunctionExpressionReturn(
        GetTypeReferenceDescriptor(
          ts.createTypeReferenceNode(declaration.name as ts.Identifier, undefined),
          scope,
        ),
      );
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.InterfaceDeclaration:
      return GetTypeReferenceDescriptor(
        ts.createTypeReferenceNode(declaration.name as ts.Identifier, undefined),
        scope,
      );
    case ts.SyntaxKind.NamespaceImport:
    case ts.SyntaxKind.ImportEqualsDeclaration:
      return GetModuleDescriptor(declaration, scope);
    case ts.SyntaxKind.EnumDeclaration:
      // TODO: Use following two lines when issue #17552 on typescript github is resolved (https://github.com/microsoft/TypeScript/issues/17552)
      // TheNewEmitResolver.ensureEmitOf(GetImportDeclarationOf(node.eprName as ts.Identifier);
      // return node.exprName as ts.Identifier;
      return GetMockFactoryCallTypeofEnum(declaration as ts.EnumDeclaration);
    case ts.SyntaxKind.FunctionDeclaration:
    case ts.SyntaxKind.MethodSignature:
      return GetMethodDeclarationDescriptor(declaration as ts.FunctionDeclaration, scope);
    case ts.SyntaxKind.VariableDeclaration:
      const variable: ts.VariableDeclaration = declaration as ts.VariableDeclaration;

      if (variable.type) {
        return GetDescriptor(variable.type, scope);
      }

      const inferredType: ts.Node = GetType(variable.initializer, scope);
      const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(inferredType);

      if (symbol) {
        const inferredTypeDeclaration: ts.NamedDeclaration = getTypeQueryDeclarationFromSymbol(symbol);

        return GetTypeQueryDescriptorFromDeclaration(inferredTypeDeclaration, scope);
      } else {
        return GetDescriptor(inferredType, scope);
      }
    default:
      TransformerLogger().typeNotSupported(`TypeQuery of ${ts.SyntaxKind[declaration.kind]}`);
      return GetNullDescriptor();
  }
}

function getTypeQueryDeclaration(node: ts.TypeQueryNode): ts.NamedDeclaration {
  const typeChecker: ts.TypeChecker = TypeChecker();
  /*
     TODO: Find different workaround without casting to any
     Cast to any is been done because getSymbolAtLocation doesn't work when the node is an inferred identifier of a type query of a type query
     Use case is:
     ```
     const myVar = MyEnum;
     createMock<typeof myVar>();
     ```
     here `typeof myVar` is inferred `typeof MyEnum` and the `MyEnum` identifier doesn't play well with getSymbolAtLocation and it returns undefined.
    */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.exprName) || (node.exprName as any).symbol;

  return getTypeQueryDeclarationFromSymbol(symbol);
}

function getTypeQueryDeclarationFromSymbol(symbol: ts.Symbol): ts.NamedDeclaration {
  const declaration: ts.Declaration = symbol.declarations[0];

  if (ts.isImportEqualsDeclaration(declaration)) {
    return declaration;
  }

  return TypescriptHelper.GetConcreteDeclarationFromSymbol(symbol);
}
