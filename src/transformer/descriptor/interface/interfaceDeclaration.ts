import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { StoreGenericsFromHeritage } from '../heritage/heritage';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration, scope: IScope): ts.Expression {
    if (IsTypescriptType(node)) {
        return GetDescriptor(GetTypescriptType(node, scope), scope);
    }

    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    StoreGenericsFromHeritage(node.heritageClauses, scope);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);
    const signatures: ReadonlyArray<ts.Signature> = type.getCallSignatures();

    scope.declarationNode = node;

    return GetMockPropertiesFromSymbol(properties, signatures, scope);
}
