import * as ts from 'typescript';
import { GetMockFactoryCallForThis } from '../mockFactoryCall/mockFactoryCall';
import { Scope } from '../scope/scope';
import { GetArrayDescriptor } from './array/array';
import { GetBooleanDescriptor } from './boolean/boolean';
import { GetBooleanFalseDescriptor } from './boolean/booleanFalse';
import { GetBooleanTrueDescriptor } from './boolean/booleanTrue';
import { GetClassDeclarationDescriptor } from './class/classDeclaration';
import { GetEnumDeclarationDescriptor } from './enum/enumDeclaration';
import { GetExpressionWithTypeArgumentsDescriptor } from './expression/expressionWithTypeArguments';
import { GetIdentifierDescriptor } from './identifier/identifier';
import { GetImportDescriptor } from './import/import';
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
import { GetPropertyDescriptor } from './property/propertySignature';
import { GetStringDescriptor } from './string/string';
import { GetTypeAliasDescriptor } from './typeAlias/typeAlias';
import { GetTypeParameterDescriptor } from './typeParameter/typeParameter';
import { GetTypeReferenceDescriptorReusable } from './typeReference/typeReferenceReusable';
import { GetUndefinedDescriptor } from './undefined/undefined';
import { GetUnionDescriptor } from './union/union';

export function GetDescriptor(node: ts.Node, scope: Scope): ts.Expression {
    switch (node.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration:
            return GetTypeAliasDescriptor(node as ts.TypeAliasDeclaration, scope);
        case ts.SyntaxKind.TypeReference:
            return GetTypeReferenceDescriptorReusable(node as ts.TypeReferenceNode, scope);
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.InterfaceDeclaration:
            return GetInterfaceDeclarationDescriptor(node as ts.InterfaceDeclaration, scope);
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
            return GetExpressionWithTypeArgumentsDescriptor(node as ts.ExpressionWithTypeArguments, scope);
        case ts.SyntaxKind.Identifier:
            return GetIdentifierDescriptor(node as ts.Identifier, scope);
        case ts.SyntaxKind.ThisType:
            return GetMockFactoryCallForThis(scope.declarationNode);
        case ts.SyntaxKind.ImportSpecifier:
            return GetImportDescriptor(node as ts.ImportSpecifier, scope);
        case ts.SyntaxKind.TypeParameter:
            return GetTypeParameterDescriptor(node as ts.TypeParameterDeclaration, scope);
        case ts.SyntaxKind.ImportClause:
            return GetImportDescriptor(node as ts.ImportClause, scope);
        case ts.SyntaxKind.MethodSignature:
            return GetMethodSignatureDescriptor(node as ts.MethodSignature, scope);
        case ts.SyntaxKind.MethodDeclaration:
            return GetMethodDeclarationDescriptor(node as ts.MethodDeclaration, scope);
        case ts.SyntaxKind.FunctionType:
            return GetFunctionTypeDescriptor(node as ts.FunctionTypeNode, scope);
        case ts.SyntaxKind.CallSignature:
            return GetFunctionTypeDescriptor(node as ts.CallSignatureDeclaration, scope);
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return GetFunctionAssignmentDescriptor(node as ts.ArrowFunction, scope);
        case ts.SyntaxKind.UnionType:
            return GetUnionDescriptor(node as ts.UnionTypeNode, scope);
        case ts.SyntaxKind.IntersectionType:
            return GetIntersectionDescriptor(node as ts.IntersectionTypeNode, scope);
        case ts.SyntaxKind.EnumDeclaration:
            return GetEnumDeclarationDescriptor(node as ts.EnumDeclaration);
        case ts.SyntaxKind.MappedType:
            return GetMappedDescriptor(node as ts.MappedTypeNode, scope);
        case ts.SyntaxKind.ArrayType:
        case ts.SyntaxKind.TupleType:
            return GetArrayDescriptor();
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
            return GetObjectLiteralDescriptor(node as ts.ObjectLiteralExpression, scope);
        case ts.SyntaxKind.BooleanKeyword:
            return GetBooleanDescriptor();
        case ts.SyntaxKind.ObjectKeyword:
            return GetMockPropertiesFromSymbol([], [], scope);
        case ts.SyntaxKind.NullKeyword:
            return GetNullDescriptor();
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.VoidKeyword:
            return GetUndefinedDescriptor();
        case ts.SyntaxKind.CallExpression:
            return node as ts.Expression;
        case ts.SyntaxKind.VariableDeclaration:
            return GetDescriptor((node as ts.VariableDeclaration).type, scope);
        case ts.SyntaxKind.TypeQuery:
            return GetDescriptor((node as ts.TypeQueryNode).exprName, scope);
        default:
            // tslint:disable-next-line:no-console
            console.log('NOT IMPLEMENTED ' + ts.SyntaxKind[node.kind]);
            return GetNullDescriptor();
    }
}
