import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { TypescriptLibsTypes, TypescriptLibsTypesFolder } from './typescriptLibsTypes';

export function IsTypescriptType(node: ts.Node): boolean {
  const nodeFile: ts.SourceFile = node.getSourceFile();

  if (nodeFile) {
    const fileName: string = nodeFile.fileName;
    return fileName.includes(TypescriptLibsTypesFolder);
  }

  return false;
}

export function GetTypescriptTypeDescriptor(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const symbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(node.typeName);
  const typeScriptType: TypescriptLibsTypes = symbol?.name && TypescriptLibsTypes[symbol.name];

  switch (typeScriptType) {
    case(TypescriptLibsTypes.Array):
    case(TypescriptLibsTypes.ReadonlyArray):
      return GetDescriptor(ts.createNode(ts.SyntaxKind.ArrayType), scope);
    case(TypescriptLibsTypes.Number):
      return GetDescriptor(ts.createNode(ts.SyntaxKind.NumberKeyword), scope);
    case(TypescriptLibsTypes.String):
      return GetDescriptor(ts.createNode(ts.SyntaxKind.StringKeyword), scope);
    case(TypescriptLibsTypes.Boolean):
      return GetDescriptor(ts.createNode(ts.SyntaxKind.BooleanKeyword), scope);
    case(TypescriptLibsTypes.Object):
      return GetDescriptor(ts.createNode(ts.SyntaxKind.ObjectKeyword), scope);
    case(TypescriptLibsTypes.Function):
      const functionNode: ts.Node = ts.createNode(ts.SyntaxKind.VoidKeyword);
      return GetDescriptor(ts.createFunctionTypeNode([], [], functionNode as ts.TypeNode), scope);
    case(TypescriptLibsTypes.Promise):
      const dataResolved: ts.Expression = node.typeArguments && node.typeArguments[0] ? GetDescriptor(node.typeArguments[0], scope) : GetUndefinedDescriptor();

      const promiseAccess: ts.PropertyAccessExpression = ts.createPropertyAccess(ts.createIdentifier('Promise'), ts.createIdentifier('resolve'));

      return ts.createCall(
        promiseAccess,
        [],
        [dataResolved],
      );
    case(TypescriptLibsTypes.Date):
      return ts.createNew(ts.createIdentifier('Date'), undefined, undefined);
    case(TypescriptLibsTypes.Map):
      return ts.createNew(ts.createIdentifier('Map'), undefined, undefined);
    case(TypescriptLibsTypes.Set):
      return ts.createNew(ts.createIdentifier('Set'), undefined, undefined);
    default:
      return GetDescriptor(ts.createNode(ts.SyntaxKind.UndefinedKeyword), scope);
  }
}
