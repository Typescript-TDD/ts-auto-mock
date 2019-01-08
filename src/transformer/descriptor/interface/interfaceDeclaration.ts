import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockProperties } from "../../mock/mockProperties";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);
    return GetMockProperties(type);
}