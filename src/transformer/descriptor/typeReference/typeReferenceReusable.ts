import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "./cache";
import { isTypeReusable } from "../../typeValidator/typeValidator";
import { GetMockFactoryCall } from "../../mockFactoryCall/mockFactoryCall";

export function GetTypeReferenceDescriptorReusable(node: ts.TypeReferenceNode): ts.Expression {
    const typeChecker = TypeChecker();

    TypeReferenceCache.instance.addIfPresent(node);

    if (isTypeReusable(node)) {
        return GetMockFactoryCall(node);
    } else {
        const symbol = typeChecker.getSymbolAtLocation(node.typeName);
        const declaration = symbol.declarations[0];
        return GetDescriptor(declaration);
    }
}