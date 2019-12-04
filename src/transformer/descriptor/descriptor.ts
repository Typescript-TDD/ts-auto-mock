import * as ts from 'typescript';
import { printer } from '../../printer';
import { TypescriptCreator } from '../helper/creator';
import { TransformerLogger } from '../logger/transformerLogger';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { GetMockFactoryCall, GetMockFactoryCallForThis } from '../mockFactoryCall/mockFactoryCall';
import { Scope } from '../scope/scope';
import { TypeChecker } from '../typeChecker/typeChecker';
import { GetArrayDescriptor } from './array/array';
import { GetBooleanDescriptor } from './boolean/boolean';
import { GetBooleanFalseDescriptor } from './boolean/booleanFalse';
import { GetBooleanTrueDescriptor } from './boolean/booleanTrue';
import { GetClassDeclarationDescriptor } from './class/classDeclaration';
import { GetConstructorTypeDescriptor } from './constructor/constructorType';
import { GetEnumDeclarationDescriptor } from './enum/enumDeclaration';
import { GetExpressionWithTypeArgumentsDescriptor } from './expression/expressionWithTypeArguments';
import { TypescriptHelper } from './helper/helper';
import { GetIdentifierDescriptor } from './identifier/identifier';
import { GetImportDescriptor } from './import/import';
import { GetImportEqualsDescriptor } from './import/importEquals';
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
import { GetTypeLiteralDescriptor } from './typeLiteral/typeLiteral';
import { GetTypeParameterDescriptor } from './typeParameter/typeParameter';
import { GetTypeReferenceDescriptor } from './typeReference/typeReference';
import { GetUndefinedDescriptor } from './undefined/undefined';
import { GetUnionDescriptor } from './union/union';
import GetFirstValidDeclaration = TypescriptHelper.GetFirstValidDeclaration;

function GetTypeQueryDescriptor(node: ts.TypeQueryNode, scope: Scope): ts.Expression {
    const declaration = TypescriptHelper.GetDeclarationFromNode(node.exprName);
    
    switch(declaration.kind) {
        case ts.SyntaxKind.ClassDeclaration:
            return TypescriptCreator.createFunctionExpressionReturn(GetClassDeclarationDescriptor(declaration as ts.ClassDeclaration, scope));
        case ts.SyntaxKind.EnumDeclaration:
            // MockDefiner.instance.addImportIdentifierOnFile('./enums', node.exprName as ts.Identifier);
            // const typeChecker: ts.TypeChecker = TypeChecker();
            // const symbol: ts.Symbol = typeChecker.getSymbolAtLocation(node.exprName);
            // printer(GetFirstValidDeclaration(symbol.declarations).parent.parent);
            // console.log(GetFirstValidDeclaration(symbol.declarations).parent.parent);
            // GetFirstValidDeclaration(symbol.declarations).parent.parent.flags, ts.EmitFlags.);
            return node.exprName as ts.Identifier;
    }
    
    return GetNullDescriptor();
}

export function GetDescriptor(node: ts.Node, scope: Scope): ts.Expression {
    switch (node.kind) {
        case ts.SyntaxKind.TypeAliasDeclaration:
            return GetTypeAliasDescriptor(node as ts.TypeAliasDeclaration, scope);
        case ts.SyntaxKind.TypeReference:
            return GetTypeReferenceDescriptor(node as ts.TypeReferenceNode, scope);
        case ts.SyntaxKind.TypeLiteral:
            return GetTypeLiteralDescriptor(node as ts.TypeLiteralNode, scope);
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
            return GetMockFactoryCallForThis(scope.currentMockKey);
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
        case ts.SyntaxKind.ConstructSignature:
            return GetFunctionTypeDescriptor(node as ts.ConstructSignatureDeclaration, scope);
        case ts.SyntaxKind.CallSignature:
            return GetFunctionTypeDescriptor(node as ts.CallSignatureDeclaration, scope);
        case ts.SyntaxKind.ArrowFunction:
        case ts.SyntaxKind.FunctionExpression:
            return GetFunctionAssignmentDescriptor(node as ts.ArrowFunction, scope);
        case ts.SyntaxKind.ConstructorType:
            return GetConstructorTypeDescriptor(node as ts.ConstructorTypeNode, scope);
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
        case ts.SyntaxKind.ImportEqualsDeclaration:
            return GetImportEqualsDescriptor(node as ts.ImportEqualsDeclaration, scope);
        case ts.SyntaxKind.AnyKeyword:
        case ts.SyntaxKind.NeverKeyword:
        case ts.SyntaxKind.UnknownKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.VoidKeyword:
            return GetUndefinedDescriptor();
        case ts.SyntaxKind.CallExpression:
            return node as ts.CallExpression;
        default:
            TransformerLogger().typeNotSupported(ts.SyntaxKind[node.kind]);
            return GetNullDescriptor();
    }
}
