import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetTypescriptTypeDescriptor, IsTypescriptType } from "../tsLibs/typecriptLibs";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    if (IsTypescriptType(node)) {
       return GetTypescriptTypeDescriptor(node);
    }

    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);
    let properties: Array<ts.Symbol> = typeChecker.getPropertiesOfType(type);
    
    return GetMockPropertiesFromSymbol(properties);
}