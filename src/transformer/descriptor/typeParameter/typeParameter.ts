import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypeReferenceCache, TypeReferenceCacheElement } from '../typeReference/cache';

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    const cacheType: TypeReferenceCacheElement = TypeReferenceCache.instance.get(type);
    if (!cacheType) {
        if (node.default) {
            return GetDescriptor(node.default);
        }
        return ts.createNull();
    }

    return cacheType.descriptor;
}
