import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "../typeReference/cache";

export function GetTypeParameterDescriptor(node: ts.TypeParameterDeclaration): ts.Expression {
    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);

    const cacheType = TypeReferenceCache.instance.get(type);

    if (!cacheType) {
        return ts.createNull();
    }

    return cacheType.descriptor;
}