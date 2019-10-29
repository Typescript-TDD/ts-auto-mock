import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetTypes } from '../type/type';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetIntersectionDescriptor(intersectionTypeNode: ts.IntersectionTypeNode): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const nodes: ts.Node[] = GetTypes(intersectionTypeNode.types);

    const hasInvalidIntersections: boolean = nodes.some((node: ts.Node) => {
        return TypescriptHelper.IsLiteralOrPrimitive(node);
    });

    if (hasInvalidIntersections) {
        return GetUndefinedDescriptor();
    }

    const symbols: ts.Symbol[] = nodes.map((node: ts.Node) => {
        const type: ts.Type = typeChecker.getTypeAtLocation(node);

        return typeChecker.getPropertiesOfType(type);
    }).reduce((acc: ts.Symbol[], symbolList: ts.Symbol[]) => {
        acc = acc.concat(symbolList);
        return acc;
    });

    const signatures: ReadonlyArray<ts.Signature> = nodes.map((node: ts.Node) => {
        const type: ts.Type = typeChecker.getTypeAtLocation(node);

        return type.getCallSignatures();
    }).reduce((acc: ReadonlyArray<ts.Signature>, signatureList: ReadonlyArray<ts.Signature>) => {
        acc = acc.concat(signatureList);
        return acc;
    });

    return GetMockPropertiesFromSymbol(symbols, signatures);
}
