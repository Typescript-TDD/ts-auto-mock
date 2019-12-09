import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetReturnTypeFromBody } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
    let returnType: ts.Expression;

    if (node.type) {
        returnType = GetDescriptor(node.type, scope);
    } else {
        returnType = GetReturnTypeFromBody(node, scope);
    }

    return GetMethodDescriptor(node.name, returnType);
}
