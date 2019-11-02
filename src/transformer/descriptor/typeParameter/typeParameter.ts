import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import {TypeReferenceCacheElement } from '../typeReference/cache';

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration, scope: IScope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    const cacheType: TypeReferenceCacheElement = scope.getTypeReference(type);
    if (!cacheType) {
        if (node.default) {
            return GetDescriptor(node.default, scope);
        }
        return ts.createNull();
    }

    return cacheType.descriptor;
}
