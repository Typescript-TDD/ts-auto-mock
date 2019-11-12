import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration, scope: Scope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);

    const properties: ts.Symbol[] = typeChecker.getPropertiesOfType(type);
    const signatures: ReadonlyArray<ts.Signature> = type.getCallSignatures();

    scope.declarationNode = node;

    return GetMockPropertiesFromSymbol(properties, signatures, scope);
}
