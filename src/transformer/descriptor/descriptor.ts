import type * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';
import { GetMockFactoryCallForThis } from '../mockFactoryCall/mockFactoryCall';
import { Scope } from '../scope/scope';
import { core } from '../core/core';
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
import { GetShorthandPropertyAssignmentDescriptor } from './shorthandPropertyAssignment/shorthandPropertyAssignment';
import { GetParameterDescriptor } from './parameter/parameter';
import { GetVariableDeclarationDescriptor } from './variable/variable';
import { GetParenthesizedExpressionDescriptor } from './parenthesizedExpression/getParenthesizedExpressionDescriptor';

export function GetDescriptor(node: ts.Node, scope: Scope): ts.Expression {
  switch (node.kind) {
    case core.ts.SyntaxKind.ShorthandPropertyAssignment:
      return GetShorthandPropertyAssignmentDescriptor(
        node as ts.ShorthandPropertyAssignment,
        scope
      );

    case core.ts.SyntaxKind.VariableDeclaration:
      return GetVariableDeclarationDescriptor(
        node as ts.VariableDeclaration,
        scope
      );
    case core.ts.SyntaxKind.Parameter:
      return GetParameterDescriptor(node as ts.ParameterDeclaration, scope);
    case core.ts.SyntaxKind.ParenthesizedExpression:
      return GetParenthesizedExpressionDescriptor(
        node as ts.ParenthesizedExpression,
        scope
      );
    case core.ts.SyntaxKind.TypeAliasDeclaration:
      return GetTypeAliasDescriptor(node as ts.TypeAliasDeclaration, scope);
    case core.ts.SyntaxKind.TypeReference:
      return GetTypeReferenceDescriptor(node as ts.TypeReferenceNode, scope);
    case core.ts.SyntaxKind.TypeLiteral:
      return GetTypeLiteralDescriptor(node as ts.TypeLiteralNode, scope);
    case core.ts.SyntaxKind.InterfaceDeclaration:
      return GetInterfaceDeclarationDescriptor(
        node as ts.InterfaceDeclaration,
        scope
      );
    case core.ts.SyntaxKind.ClassDeclaration:
      return GetClassDeclarationDescriptor(node as ts.ClassDeclaration, scope);
    case core.ts.SyntaxKind.PropertySignature:
    case core.ts.SyntaxKind.PropertyAssignment:
      return GetPropertyDescriptor(node as ts.PropertySignature, scope);
    case core.ts.SyntaxKind.PropertyDeclaration:
      return GetPropertyDescriptor(node as ts.PropertyDeclaration, scope);
    case core.ts.SyntaxKind.LiteralType:
      return GetLiteralDescriptor(node as ts.LiteralTypeNode, scope);
    case core.ts.SyntaxKind.ExpressionWithTypeArguments:
      return GetExpressionWithTypeArgumentsDescriptor(
        node as ts.ExpressionWithTypeArguments,
        scope
      );
    case core.ts.SyntaxKind.Identifier:
      return GetIdentifierDescriptor(node as ts.Identifier, scope);
    case core.ts.SyntaxKind.ThisType:
      if (!scope.currentMockKey) {
        throw new Error(
          `The transformer attempted to look up a mock factory call for \`${node.getText()}' without a mock key.`
        );
      }

      return GetMockFactoryCallForThis(scope.currentMockKey);
    case core.ts.SyntaxKind.ImportSpecifier:
      return GetImportDescriptor(node as ts.ImportSpecifier, scope);
    case core.ts.SyntaxKind.TypeParameter:
      return GetTypeParameterDescriptor(
        node as ts.TypeParameterDeclaration,
        scope
      );
    case core.ts.SyntaxKind.ImportClause:
      return GetImportDescriptor(node as ts.ImportClause, scope);
    case core.ts.SyntaxKind.MethodSignature:
      return GetMethodSignatureDescriptor(node as ts.MethodSignature, scope);
    case core.ts.SyntaxKind.GetAccessor:
      return GetGetAccessorDeclarationDescriptor(
        node as ts.GetAccessorDeclaration,
        scope
      );
    case core.ts.SyntaxKind.FunctionDeclaration:
      return GetMethodDeclarationDescriptor(
        node as ts.FunctionDeclaration,
        scope
      );
    case core.ts.SyntaxKind.MethodDeclaration:
      return GetMethodDeclarationDescriptor(
        node as ts.MethodDeclaration,
        scope
      );
    case core.ts.SyntaxKind.FunctionType:
      return GetFunctionTypeDescriptor(node as ts.FunctionTypeNode, scope);
    case core.ts.SyntaxKind.ConstructSignature:
      return GetFunctionTypeDescriptor(
        node as ts.ConstructSignatureDeclaration,
        scope
      );
    case core.ts.SyntaxKind.CallSignature:
      return GetFunctionTypeDescriptor(
        node as ts.CallSignatureDeclaration,
        scope
      );
    case core.ts.SyntaxKind.ArrowFunction:
    case core.ts.SyntaxKind.FunctionExpression:
      return GetFunctionAssignmentDescriptor(node as ts.ArrowFunction, scope);
    case core.ts.SyntaxKind.ConstructorType:
      return GetConstructorTypeDescriptor(
        node as ts.ConstructorTypeNode,
        scope
      );
    case core.ts.SyntaxKind.TypeQuery:
      return GetTypeQueryDescriptor(node as ts.TypeQueryNode, scope);
    case core.ts.SyntaxKind.UnionType:
      return GetUnionDescriptor(node as ts.UnionTypeNode, scope);
    case core.ts.SyntaxKind.IntersectionType:
      return GetIntersectionDescriptor(node as ts.IntersectionTypeNode, scope);
    case core.ts.SyntaxKind.EnumDeclaration:
      return GetEnumDeclarationDescriptor(node as ts.EnumDeclaration);
    case core.ts.SyntaxKind.MappedType:
      return GetMappedDescriptor(node as ts.MappedTypeNode, scope);
    case core.ts.SyntaxKind.ParenthesizedType:
      return GetParenthesizedDescriptor(
        node as ts.ParenthesizedTypeNode,
        scope
      );
    case core.ts.SyntaxKind.ArrayType:
      return GetArrayDescriptor();
    case core.ts.SyntaxKind.TupleType:
      return GetTupleDescriptor(node as ts.TupleTypeNode, scope);
    case core.ts.SyntaxKind.StringKeyword:
      return GetStringDescriptor();
    case core.ts.SyntaxKind.NumberKeyword:
      return GetNumberDescriptor();
    case core.ts.SyntaxKind.TrueKeyword:
      return GetBooleanTrueDescriptor();
    case core.ts.SyntaxKind.FalseKeyword:
      return GetBooleanFalseDescriptor();
    case core.ts.SyntaxKind.NumericLiteral:
    case core.ts.SyntaxKind.StringLiteral:
      return GetLiteralDescriptor(node as ts.LiteralTypeNode, scope);
    case core.ts.SyntaxKind.ObjectLiteralExpression:
      return GetObjectLiteralDescriptor(
        node as ts.ObjectLiteralExpression,
        scope
      );
    case core.ts.SyntaxKind.IndexedAccessType:
      return GetIndexedAccessTypeDescriptor(
        node as ts.IndexedAccessTypeNode,
        scope
      );
    case core.ts.SyntaxKind.BooleanKeyword:
    case core.ts.SyntaxKind.TypePredicate:
    case core.ts.SyntaxKind.FirstTypeNode:
      return GetBooleanDescriptor();
    case core.ts.SyntaxKind.ObjectKeyword:
      return GetMockPropertiesFromSymbol([], [], scope);
    case core.ts.SyntaxKind.NullKeyword:
      return GetNullDescriptor();
    case core.ts.SyntaxKind.ImportEqualsDeclaration:
      return GetImportEqualsDescriptor(
        node as ts.ImportEqualsDeclaration,
        scope
      );
    case core.ts.SyntaxKind.TypeOperator:
      return GetTypeOperatorDescriptor(node as ts.TypeOperatorNode, scope);
    case core.ts.SyntaxKind.BigIntKeyword:
      return GetBigIntDescriptor();
    case core.ts.SyntaxKind.AnyKeyword:
    case core.ts.SyntaxKind.NeverKeyword:
    case core.ts.SyntaxKind.UnknownKeyword:
    case core.ts.SyntaxKind.UndefinedKeyword:
    case core.ts.SyntaxKind.VoidKeyword:
      return GetUndefinedDescriptor();
    case core.ts.SyntaxKind.CallExpression:
      return GetCallExpressionDescriptor(node as ts.CallExpression, scope);
    default:
      TransformerLogger().typeNotSupported(core.ts.SyntaxKind[node.kind], node);
      return GetNullDescriptor();
  }
}
