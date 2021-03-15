import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import {
  createArrayTypeNode,
  createCall,
  createFunctionTypeNode,
  createIdentifier,
  createNew,
  createPropertyAccess,
  createTypeNode,
} from '../../../typescriptFactory/typescriptFactory';
import {
  TypescriptLibsTypes,
  TypescriptLibsTypesFolder,
} from './typescriptLibsTypes';

export function IsTypescriptType(node: ts.Node): boolean {
  const nodeFile: ts.SourceFile = node.getSourceFile();

  if (nodeFile) {
    const fileName: string = nodeFile.fileName;
    return fileName.includes(TypescriptLibsTypesFolder);
  }

  return false;
}

export function GetTypescriptTypeDescriptor(
  node: ts.TypeReferenceNode,
  scope: Scope
): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const symbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(
    node.typeName
  );
  const typeScriptType: TypescriptLibsTypes =
    symbol?.name && TypescriptLibsTypes[symbol.name];

  switch (typeScriptType) {
    case TypescriptLibsTypes.Array:
    case TypescriptLibsTypes.ReadonlyArray:
      return GetDescriptor(createArrayTypeNode(), scope);
    case TypescriptLibsTypes.Number:
      return GetDescriptor(createTypeNode(ts.SyntaxKind.NumberKeyword), scope);
    case TypescriptLibsTypes.String:
      return GetDescriptor(createTypeNode(ts.SyntaxKind.StringKeyword), scope);
    case TypescriptLibsTypes.Boolean:
      return GetDescriptor(createTypeNode(ts.SyntaxKind.BooleanKeyword), scope);
    case TypescriptLibsTypes.Object:
      return GetDescriptor(createTypeNode(ts.SyntaxKind.ObjectKeyword), scope);
    case TypescriptLibsTypes.Function:
      const functionNode: ts.KeywordTypeNode<ts.SyntaxKind.VoidKeyword> = createTypeNode(
        ts.SyntaxKind.VoidKeyword
      );
      return GetDescriptor(createFunctionTypeNode(functionNode), scope);
    case TypescriptLibsTypes.Promise:
      const dataResolved: ts.Expression =
        node.typeArguments && node.typeArguments[0]
          ? GetDescriptor(node.typeArguments[0], scope)
          : GetUndefinedDescriptor();

      const promiseAccess: ts.PropertyAccessExpression = createPropertyAccess(
        createIdentifier('Promise'),
        createIdentifier('resolve')
      );

      return createCall(promiseAccess, [dataResolved]);
    case TypescriptLibsTypes.Date:
      return createNew(createIdentifier('Date'));
    case TypescriptLibsTypes.Map:
      return createNew(createIdentifier('Map'));
    case TypescriptLibsTypes.Set:
      return createNew(createIdentifier('Set'));
    default:
      return GetDescriptor(
        createTypeNode(ts.SyntaxKind.UndefinedKeyword),
        scope
      );
  }
}
