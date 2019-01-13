import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockProperties } from "../mock/mockProperties";
import { GetTypescriptType, IsTypescriptType } from "../tsLibs/typecriptLibs";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    if (IsTypescriptType(node)) {
       return GetTypescriptType(node);
    }

    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);
    let properties: Array<ts.Symbol> = typeChecker.getPropertiesOfType(type);

    return GetMockProperties(properties);
}