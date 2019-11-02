import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { TypeReferenceCacheElement } from '../typeReference/cache';
import { TypescriptLibsTypes } from './typescriptLibsTypes';

export function TypescriptLibsTypeAdapter(node: ts.Node, scope: IScope): ts.Node {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);
    const typeScriptType: TypescriptLibsTypes = TypescriptLibsTypes[type.symbol.name];

    switch (typeScriptType) {
        case(TypescriptLibsTypes.Array):
        case(TypescriptLibsTypes.ReadonlyArray):
            return ts.createNode(ts.SyntaxKind.ArrayType);
        case(TypescriptLibsTypes.Number):
            return ts.createNode(ts.SyntaxKind.NumberKeyword);
        case(TypescriptLibsTypes.String):
            return ts.createNode(ts.SyntaxKind.StringKeyword);
        case(TypescriptLibsTypes.Boolean):
            return ts.createNode(ts.SyntaxKind.BooleanKeyword);
        case(TypescriptLibsTypes.Object):
            return ts.createNode(ts.SyntaxKind.TypeLiteral);
        case(TypescriptLibsTypes.Function):
            const functionNode: ts.Node = ts.createNode(ts.SyntaxKind.VoidKeyword);
            return ts.createFunctionTypeNode([], [], functionNode as ts.TypeNode);
        case(TypescriptLibsTypes.Promise):
            const parameter: ts.TypeParameterDeclaration = (node as ts.TypeAliasDeclaration).typeParameters[0];
            const typeParameter: ts.Type = typeChecker.getTypeAtLocation(parameter);

            const promiseResolveType: TypeReferenceCacheElement = scope.getTypeReference(typeParameter);
            const promiseAccess: ts.PropertyAccessExpression = ts.createPropertyAccess(ts.createIdentifier('Promise'), ts.createIdentifier('resolve'));

            return ts.createCall(
                promiseAccess,
                [],
                promiseResolveType ? [promiseResolveType.descriptor] : [],
            );
        default:
            return ts.createNode(ts.SyntaxKind.UndefinedKeyword);
    }
}
