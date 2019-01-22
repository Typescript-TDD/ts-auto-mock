import * as ts from 'typescript';
import { TypeChecker } from "../../typeChecker/typeChecker";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { StoreGenericsFromHeritage } from '../heritage/heritage';

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration): ts.Expression {
    const typeChecker = TypeChecker();
    const type = typeChecker.getTypeAtLocation(node);
    
    StoreGenericsFromHeritage(node.heritageClauses);

    let properties: Array<ts.Symbol> = typeChecker.getPropertiesOfType(type);

    return GetMockPropertiesFromSymbol(properties);
}