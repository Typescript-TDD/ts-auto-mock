import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetProperties } from '../properties/properties';

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration, scope: Scope): ts.Expression {
    scope.declarationNode = node;

    return GetProperties(node, scope);
}
