import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "./cache";

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    const typeChecker = TypeChecker();

    TypeReferenceCache.instance.addIfPresent(node);

    const symbol = typeChecker.getSymbolAtLocation(node.typeName);
    const declaration = symbol.declarations[0];
    return GetDescriptor(declaration);
}