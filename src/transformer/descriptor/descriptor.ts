import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';
import { GetMockFactoryCallForThis } from '../mockFactoryCall/mockFactoryCall';
import { Scope } from '../scope/scope';
import { GetArrayDescriptor } from './array/array';
import { GetBigIntDescriptor } from './bigint/bigint';
import { GetBooleanDescriptor } from './boolean/boolean';
import { GetBooleanFalseDescriptor } from './boolean/booleanFalse';
import { GetBooleanTrueDescriptor } from './boolean/booleanTrue';
import { GetCallExpressionDescriptor } from './callExpression/callExpression';
import { GetClassDeclarationDescriptor } from './class/classDeclaration';
import { GetConstructorTypeDescriptor } from './constructor/constructorType';
import { GetEnumDeclarationDescriptor } from './enum/enumDeclaration';
import { GetExpressionWithTypeArgumentsDescriptor } from './expression/expressionWithTypeArguments';
import { GetGetAccessorDeclarationDescriptor } from './getAccessor/getAccessor';
import { GetIdentifierDescriptor } from './identifier/identifier';
import { GetImportDescriptor } from './import/import';
import { GetImportEqualsDescriptor } from './import/importEquals';
import { GetIndexedAccessTypeDescriptor } from './indexedAccess/indexedAccess';
import { GetInterfaceDeclarationDescriptor } from './interface/interfaceDeclaration';
import { GetIntersectionDescriptor } from './intersection/intersection';
import { GetLiteralDescriptor } from './literal/literal';
import { GetMappedDescriptor } from './mapped/mapped';
import { GetFunctionAssignmentDescriptor } from './method/functionAssignment';
import { GetFunctionTypeDescriptor } from './method/functionType';
import { GetMethodDeclarationDescriptor } from './method/methodDeclaration';
import { GetMethodSignatureDescriptor } from './method/methodSignature';
import { GetMockPropertiesFromSymbol } from './mock/mockProperties';
import { GetNullDescriptor } from './null/null';
import { GetNumberDescriptor } from './number/number';
import { GetObjectLiteralDescriptor } from './objectLiteral/objectLiteral';
import { GetParenthesizedDescriptor } from './parenthesized/parenthesized';
import { GetPropertyDescriptor } from './property/propertySignature';
import { GetStringDescriptor } from './string/string';
import { GetTypeAliasDescriptor } from './typeAlias/typeAlias';
import { GetTypeLiteralDescriptor } from './typeLiteral/typeLiteral';
import { GetTypeParameterDescriptor } from './typeParameter/typeParameter';
import { GetTypeQueryDescriptor } from './typeQuery/typeQuery';
import { GetTypeReferenceDescriptor } from './typeReference/typeReference';
import { GetUndefinedDescriptor } from './undefined/undefined';
import { GetUnionDescriptor } from './union/union';
import { GetTypeOperatorDescriptor } from './typeOperator/typeOperator';
import { GetTupleDescriptor } from './tuple/tuple';

export function GetDescriptor(node: ts.Node, scope: Scope): ts.Expression {
  switch (node.kind) {
    case ts.SyntaxKind.TypeAliasDeclaration:
      return GetTypeAliasDescriptor(node as ts.TypeAliasDeclaration, scope);
    case ts.SyntaxKind.TypeReference:
      return GetTypeReferenceDescriptor(node as ts.TypeReferenceNode, scope);
    case ts.SyntaxKind.TypeLiteral:
      return GetTypeLiteralDescriptor(node as ts.TypeLiteralNode, scope);
    case ts.SyntaxKind.InterfaceDeclaration:
      return GetInterfaceDeclarationDescriptor(
        node as ts.InterfaceDeclaration,
        scope
      );
    case ts.SyntaxKind.ClassDeclaration:
      return GetClassDeclarationDescriptor(node as ts.ClassDeclaration, scope);
    case ts.SyntaxKind.PropertySignature:
    case ts.SyntaxKind.PropertyAssignment:
      return GetPropertyDescriptor(node as ts.PropertySignature, scope);
    case ts.SyntaxKind.PropertyDeclaration:
      return GetPropertyDescriptor(node as ts.PropertyDeclaration, scope);
    case ts.SyntaxKind.LiteralType:
      return GetLiteralDescriptor(node as ts.LiteralTypeNode, scope);
    case ts.SyntaxKind.ExpressionWithTypeArguments:
      return GetExpressionWithTypeArgumentsDescriptor(
        node as ts.ExpressionWithTypeArguments,
        scope
      );
    case ts.SyntaxKind.Identifier:
      return GetIdentifierDescriptor(node as ts.Identifier, scope);
    case ts.SyntaxKind.ThisType:
      if (!scope.currentMockKey) {
        throw new Error(
          `The transformer attempted to look up a mock factory call for \`${node.getText()}' without a mock key.`
        );
      }

      return GetMockFactoryCallForThis(scope.currentMockKey);
    case ts.SyntaxKind.ImportSpecifier:
      return GetImportDescriptor(node as ts.ImportSpecifier, scope);
    case ts.SyntaxKind.TypeParameter:
      return GetTypeParameterDescriptor(
        node as ts.TypeParameterDeclaration,
        scope
      );
    case ts.SyntaxKind.ImportClause:
      return GetImportDescriptor(node as ts.ImportClause, scope);
    case ts.SyntaxKind.MethodSignature:
      return GetMethodSignatureDescriptor(node as ts.MethodSignature, scope);
    case ts.SyntaxKind.GetAccessor:
      return GetGetAccessorDeclarationDescriptor(
        node as ts.GetAccessorDeclaration,
        scope
      );
    case ts.SyntaxKind.SetAccessor:
      return GetUndefinedDescriptor();
    case ts.SyntaxKind.FunctionDeclaration:
      return GetMethodDeclarationDescriptor(
        node as ts.FunctionDeclaration,
        scope
      );
    case ts.SyntaxKind.MethodDeclaration:
      return GetMethodDeclarationDescriptor(
        node as ts.MethodDeclaration,
        scope
      );
    case ts.SyntaxKind.FunctionType:
      return GetFunctionTypeDescriptor(node as ts.FunctionTypeNode, scope);
    case ts.SyntaxKind.ConstructSignature:
      return GetFunctionTypeDescriptor(
        node as ts.ConstructSignatureDeclaration,
        scope
      );
    case ts.SyntaxKind.CallSignature:
      return GetFunctionTypeDescriptor(
        node as ts.CallSignatureDeclaration,
        scope
      );
    case ts.SyntaxKind.ArrowFunction:
    case ts.SyntaxKind.FunctionExpression:
      return GetFunctionAssignmentDescriptor(node as ts.ArrowFunction, scope);
    case ts.SyntaxKind.ConstructorType:
      return GetConstructorTypeDescriptor(
        node as ts.ConstructorTypeNode,
        scope
      );
    case ts.SyntaxKind.TypeQuery:
      return GetTypeQueryDescriptor(node as ts.TypeQueryNode, scope);
    case ts.SyntaxKind.UnionType:
      return GetUnionDescriptor(node as ts.UnionTypeNode, scope);
    case ts.SyntaxKind.IntersectionType:
      return GetIntersectionDescriptor(node as ts.IntersectionTypeNode, scope);
    case ts.SyntaxKind.EnumDeclaration:
      return GetEnumDeclarationDescriptor(node as ts.EnumDeclaration);
    case ts.SyntaxKind.MappedType:
      return GetMappedDescriptor(node as ts.MappedTypeNode, scope);
    case ts.SyntaxKind.ParenthesizedType:
      return GetParenthesizedDescriptor(
        node as ts.ParenthesizedTypeNode,
        scope
      );
    case ts.SyntaxKind.ArrayType:
      return GetArrayDescriptor();
    case ts.SyntaxKind.TupleType:
      return GetTupleDescriptor(node as ts.TupleTypeNode, scope);
    case ts.SyntaxKind.StringKeyword:
      return GetStringDescriptor();
    case ts.SyntaxKind.NumberKeyword:
      return GetNumberDescriptor();
    case ts.SyntaxKind.TrueKeyword:
      return GetBooleanTrueDescriptor();
    case ts.SyntaxKind.FalseKeyword:
      return GetBooleanFalseDescriptor();
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.StringLiteral:
      return GetLiteralDescriptor(node as ts.LiteralTypeNode, scope);
    case ts.SyntaxKind.ObjectLiteralExpression:
      return GetObjectLiteralDescriptor(
        node as ts.ObjectLiteralExpression,
        scope
      );
    case ts.SyntaxKind.IndexedAccessType:
      return GetIndexedAccessTypeDescriptor(
        node as ts.IndexedAccessTypeNode,
        scope
      );
    case ts.SyntaxKind.BooleanKeyword:
    case ts.SyntaxKind.TypePredicate:
    case ts.SyntaxKind.FirstTypeNode:
      return GetBooleanDescriptor();
    case ts.SyntaxKind.ObjectKeyword:
      return GetMockPropertiesFromSymbol([], [], scope);
    case ts.SyntaxKind.NullKeyword:
      return GetNullDescriptor();
    case ts.SyntaxKind.ImportEqualsDeclaration:
      return GetImportEqualsDescriptor(
        node as ts.ImportEqualsDeclaration,
        scope
      );
    case ts.SyntaxKind.TypeOperator:
      return GetTypeOperatorDescriptor(node as ts.TypeOperatorNode, scope);
    case ts.SyntaxKind.BigIntKeyword:
      return GetBigIntDescriptor();
    case ts.SyntaxKind.AnyKeyword:
    case ts.SyntaxKind.NeverKeyword:
    case ts.SyntaxKind.UnknownKeyword:
    case ts.SyntaxKind.UndefinedKeyword:
    case ts.SyntaxKind.VoidKeyword:
      return GetUndefinedDescriptor();
    case ts.SyntaxKind.CallExpression:
      return GetCallExpressionDescriptor(node as ts.CallExpression, scope);
    default:
      TransformerLogger().typeNotSupported(ts.SyntaxKind[node.kind], node);
      return GetNullDescriptor();
  }
}
