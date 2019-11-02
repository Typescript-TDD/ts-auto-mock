import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { StoreGenericsFromHeritage } from '../heritage/heritage';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration, scope: IScope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    StoreGenericsFromHeritage(node.heritageClauses, scope);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    scope.declarationNode = node;

    return GetMockPropertiesFromSymbol(properties, [], scope);
}
