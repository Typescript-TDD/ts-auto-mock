import * as ts from 'typescript';
import { GetTypeChecker } from "../../getTypeChecker";
import { GetMockProperties } from "../../mock/mockProperties";

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration): ts.Expression {
    const typeChecker = GetTypeChecker();
    const type = typeChecker.getTypeAtLocation(node);
    return GetMockProperties(type);
}