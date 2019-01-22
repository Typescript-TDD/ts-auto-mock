import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "./cache";
import { isTypeReusable } from "../../typeValidator/typeValidator";
import { GetMockFactoryCall } from "../../mockFactoryCall/mockFactoryCall";
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptorReusable(node: ts.TypeReferenceNode): ts.Expression {
    TypeReferenceCache.instance.addIfPresentForTypeReference(node);

    if (isTypeReusable(node)) {
        return GetMockFactoryCall(node);
    } else {
        const declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
        return GetDescriptor(declaration);
    }
}