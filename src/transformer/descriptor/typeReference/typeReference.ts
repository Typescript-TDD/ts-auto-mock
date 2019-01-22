import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";
import { TypeReferenceCache } from "./cache";
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    TypeReferenceCache.instance.addIfPresentForTypeReference(node);

    const declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    return GetDescriptor(declaration);
}