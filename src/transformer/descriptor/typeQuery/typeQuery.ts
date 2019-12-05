import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetMockFactoryCallTypeofEnum } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { TypescriptHelper } from '../helper/helper';
import { GetMethodDeclarationDescriptor } from '../method/methodDeclaration';
import { GetNullDescriptor } from '../null/null';
import { GetTypeReferenceDescriptor } from '../typeReference/typeReference';

export function GetTypeQueryDescriptor(node: ts.TypeQueryNode, scope: Scope): ts.Expression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.exprName);

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
    default:
      TransformerLogger().typeNotSupported(`TypeQuery of ${ts.SyntaxKind[declaration.kind]}`);
      return GetNullDescriptor();
  }
}
