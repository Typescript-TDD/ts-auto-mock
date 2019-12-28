import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetMockFactoryCallTypeofEnum } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMethodDeclarationDescriptor } from '../method/methodDeclaration';
import { GetNullDescriptor } from '../null/null';
import { GetTypeReferenceDescriptor } from '../typeReference/typeReference';

export function GetTypeQueryDescriptor(node: ts.TypeQueryNode, scope: Scope): ts.Expression {
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
  // tslint:disable-next-line no-any
  const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.exprName) || (node.exprName as any).symbol;
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromSymbol(symbol);

  switch (declaration.kind) {
    case ts.SyntaxKind.ClassDeclaration:
      return TypescriptCreator.createFunctionExpressionReturn(
        GetTypeReferenceDescriptor(
          ts.createTypeReferenceNode(node.exprName as ts.Identifier, undefined),
          scope,
        ),
      );
    case ts.SyntaxKind.EnumDeclaration:
      // TODO: Use following two lines when issue #17552 on typescript github is resolved (https://github.com/microsoft/TypeScript/issues/17552)
      // TheNewEmitResolver.ensureEmitOf(GetImportDeclarationOf(node.eprName as ts.Identifier);
      // return node.exprName as ts.Identifier;
      return GetMockFactoryCallTypeofEnum(declaration as ts.EnumDeclaration);
    case ts.SyntaxKind.FunctionDeclaration:
      return GetMethodDeclarationDescriptor(declaration as ts.FunctionDeclaration, scope);
    case ts.SyntaxKind.VariableDeclaration:
      const typeNode: ts.TypeNode = (declaration as ts.VariableDeclaration).type || typeChecker.typeToTypeNode(typeChecker.getTypeFromTypeNode(node));
      return GetDescriptor(typeNode, scope);
    default:
      TransformerLogger().typeNotSupported(`TypeQuery of ${ts.SyntaxKind[declaration.kind]}`);
      return GetNullDescriptor();
  }
}
