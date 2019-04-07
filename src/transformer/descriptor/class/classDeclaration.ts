import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { StoreGenericsFromHeritage } from '../heritage/heritage';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    StoreGenericsFromHeritage(node.heritageClauses);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    return GetMockPropertiesFromSymbol(properties);
}
