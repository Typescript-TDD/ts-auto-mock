import * as ts from 'typescript';
import { GetMockFactoryCall } from '../mockFactoryCall/mockFactoryCall';
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

export function GetDescriptor(node: ts.Node): ts.Expression {
    switch (node.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration:
            return GetTypeAliasDescriptor(node as ts.TypeAliasDeclaration);
        case ts.SyntaxKind.TypeReference:
            return GetTypeReferenceDescriptorReusable(node as ts.TypeReferenceNode);
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.InterfaceDeclaration:
            return GetInterfaceDeclarationDescriptor(node as ts.InterfaceDeclaration);
        case ts.SyntaxKind.ClassDeclaration:
            return GetClassDeclarationDescriptor(node as ts.ClassDeclaration);
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.PropertyAssignment:
            return GetPropertyDescriptor(node as ts.PropertySignature);
        case ts.SyntaxKind.PropertyDeclaration:
            return GetPropertyDescriptor(node as ts.PropertyDeclaration);
        case ts.SyntaxKind.LiteralType:
            return GetLiteralDescriptor(node as ts.LiteralTypeNode);
        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return GetExpressionWithTypeArgumentsDescriptor(node as ts.ExpressionWithTypeArguments);
        case ts.SyntaxKind.Identifier:
            return GetIdentifierDescriptor(node as ts.Identifier);
        case ts.SyntaxKind.ThisType:
            return GetMockFactoryCall(node);
        case ts.SyntaxKind.ImportSpecifier:
            return GetImportDescriptor(node as ts.ImportSpecifier);
        case ts.SyntaxKind.TypeParameter:
            return GetTypeParameterDescriptor(node as ts.TypeParameterDeclaration);
        case ts.SyntaxKind.ImportClause:
            return GetImportDescriptor(node as ts.ImportClause);
        case ts.SyntaxKind.MethodSignature:
            return GetMethodSignatureDescriptor(node as ts.MethodSignature);
        case ts.SyntaxKind.MethodDeclaration:
            return GetMethodDeclarationDescriptor(node as ts.MethodDeclaration);
        case ts.SyntaxKind.FunctionType:
            return GetFunctionTypeDescriptor(node as ts.FunctionTypeNode);
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return GetFunctionAssignmentDescriptor(node as ts.ArrowFunction);
        case ts.SyntaxKind.UnionType:
            return GetUnionDescriptor(node as ts.UnionTypeNode);
        case ts.SyntaxKind.IntersectionType:
            return GetIntersectionDescriptor(node as ts.IntersectionTypeNode);
        case ts.SyntaxKind.EnumDeclaration:
            return GetEnumDeclarationDescriptor(node as ts.EnumDeclaration);
        case ts.SyntaxKind.MappedType:
            return GetMappedDescriptor(node as ts.MappedTypeNode);
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
            return GetLiteralDescriptor(node as ts.LiteralTypeNode);
        case ts.SyntaxKind.ObjectLiteralExpression:
            return GetObjectLiteralDescriptor(node as ts.ObjectLiteralExpression);
        case ts.SyntaxKind.BooleanKeyword:
            return GetBooleanDescriptor();
        case ts.SyntaxKind.ObjectKeyword:
            return GetMockPropertiesFromSymbol([]);
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
        default:
            // tslint:disable-next-line:no-console
            console.log('NOT IMPLEMENTED ' + ts.SyntaxKind[node.kind]);
            return GetNullDescriptor();
    }
}
