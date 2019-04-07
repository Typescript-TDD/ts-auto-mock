import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetReturnTypeFromBody } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration): ts.Expression {
    let returnType: ts.Expression;

    if (node.type) {
        returnType = GetDescriptor(node.type);
    } else {
        returnType = GetReturnTypeFromBody(node);
    }

    return GetMethodDescriptor(node.name, returnType);
}
