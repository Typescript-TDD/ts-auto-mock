import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetUndefinedDescriptor } from "../undefined/undefined";
import { TypescriptHelper } from "../helper/helper";
import { GetType, GetTypes } from '../type/type';

export function GetIntersectionDescriptor(node: ts.IntersectionTypeNode): ts.Expression {
    const typeChecker = TypeChecker();
    let hasLiteralOrPrimitive = false;
    const symbols = GetTypes(node.types).map((node: ts.Node) => {
        if (TypescriptHelper.IsLiteralOrPrimitive(node)) {
			hasLiteralOrPrimitive = true;
        } else {
            const type = typeChecker.getTypeAtLocation(node);
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