import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { StoreGenericsFromHeritage } from '../heritage/heritage';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    if (IsTypescriptType(node)) {
        return GetDescriptor(GetTypescriptType(node));
    }

    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    StoreGenericsFromHeritage(node.heritageClauses);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    return GetMockPropertiesFromSymbol(properties);
}
