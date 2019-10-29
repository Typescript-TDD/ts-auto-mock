import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetTypes } from '../type/type';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetIntersectionDescriptor(intersectionTypeNode: ts.IntersectionTypeNode): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    let hasLiteralOrPrimitive: boolean = false;
    const symbols: ts.Symbol[] = GetTypes(intersectionTypeNode.types).map((node: ts.Node) => {
        if (TypescriptHelper.IsLiteralOrPrimitive(node)) {
            hasLiteralOrPrimitive = true;
        } else {
            const type: ts.Type = typeChecker.getTypeAtLocation(node);
            return typeChecker.getPropertiesOfType(type);
        }
    }).reduce((acc: ts.Symbol[], symbolList: ts.Symbol[]) => {
        acc = acc.concat(symbolList);
        return acc;
    }, []);

    if (hasLiteralOrPrimitive) {
        return GetUndefinedDescriptor();
    }

    return GetMockPropertiesFromSymbol(symbols, []);
}
