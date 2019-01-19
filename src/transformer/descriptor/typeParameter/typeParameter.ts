import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "../typeReference/cache";
import { GetDescriptor } from '../descriptor';

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration): ts.Expression {
    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);

    const cacheType = TypeReferenceCache.instance.get(type);
    if (!cacheType) {
        if (node.default) {
            return GetDescriptor(node.default);
        }
        return ts.createNull();
    }

    return cacheType.descriptor;
}