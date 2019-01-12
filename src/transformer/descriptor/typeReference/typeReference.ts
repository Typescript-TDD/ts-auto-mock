import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "./cache";
import { TypescriptHelper } from "../helper/helper";


export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    const typeChecker = TypeChecker();

    if (node.typeArguments) {
        const declarationTypeParameters = TypescriptHelper.findParameterOfNode(node.typeName);

        node.typeArguments.forEach((typeArgument, index: number) => {
            const type = typeChecker.getTypeAtLocation(declarationTypeParameters[index]);

            TypeReferenceCache.instance.add(type, GetDescriptor(typeArgument));
        });
    }

    const symbol = typeChecker.getSymbolAtLocation(node.typeName);
    const declaration = symbol.declarations[0];
    return GetDescriptor(declaration);
}