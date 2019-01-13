import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetUndefinedDescriptor } from "../undefined/undefined";
import { TypescriptHelper } from "../helper/helper";

export function GetIntersectionDescriptor(node: ts.IntersectionTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
    let hasLiteralOrPrimitive = false;
    const symbols: ts.Symbol[] = node.types.map((typeNode: ts.TypeNode) => {
        if (TypescriptHelper.IsLiteralOrPrimitive(typeNode)) {
			hasLiteralOrPrimitive = true
        } else {
			const type = typeChecker.getTypeFromTypeNode(typeNode);
			return typeChecker.getPropertiesOfType(type);
        }
    }).reduce((acc, symbolList: ts.Symbol[]) => {
        acc = acc.concat(symbolList);
        return acc;
    }, []);
    
    if (hasLiteralOrPrimitive) {
        return GetUndefinedDescriptor();
    }
    
    return GetMockPropertiesFromSymbol(symbols);
}