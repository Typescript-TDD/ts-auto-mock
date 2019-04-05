import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetTypescriptType, IsTypescriptType } from "../tsLibs/typecriptLibs";
import { GetDescriptor } from "../descriptor";
import { StoreGenericsFromHeritage } from '../heritage/heritage';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    if (IsTypescriptType(node)) {
       return GetDescriptor(GetTypescriptType(node));
    }

    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);

    StoreGenericsFromHeritage(node.heritageClauses);

    let properties: Array<ts.Symbol> = typeChecker.getPropertiesOfType(type);
    
    return GetMockPropertiesFromSymbol(properties);
}