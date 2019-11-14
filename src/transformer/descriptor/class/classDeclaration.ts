import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration, scope: Scope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    scope.declarationNode = node;

    return GetMockPropertiesFromSymbol(properties, [], scope);
}
