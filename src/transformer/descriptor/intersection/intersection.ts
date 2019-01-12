import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockProperties } from "../mock/mockProperties";

export function GetIntersectionDescriptor(node: ts.IntersectionTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
    const symbols: ts.Symbol[] = node.types.map((typeNode: ts.TypeNode) => {
        const type = typeChecker.getTypeFromTypeNode(typeNode);
        return typeChecker.getPropertiesOfType(type);
    }).reduce((acc, symbolList: ts.Symbol[]) => {
        acc = acc.concat(symbolList);
        return acc;
    }, []);

    return GetMockProperties(symbols);
}