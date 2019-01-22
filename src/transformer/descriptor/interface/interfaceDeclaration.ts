import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetTypescriptType, IsTypescriptType } from "../tsLibs/typecriptLibs";
import { GetDescriptor } from "../descriptor";
import { StoreGenericsFromHeritage } from '../heritage/heritage';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    const typeChecker = TypeChecker();
    if (IsTypescriptType(node)) {
       return GetDescriptor(GetTypescriptType(node));
    }

    StoreGenericsFromHeritage(node.heritageClauses);

    const type = typeChecker.getTypeAtLocation(node);
    let properties: Array<ts.Symbol> = typeChecker.getPropertiesOfType(type);
    
    return GetMockPropertiesFromSymbol(properties);
}