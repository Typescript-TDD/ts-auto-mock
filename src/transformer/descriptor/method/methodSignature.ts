import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetNullDescriptor } from '../null/null';
import { GetMethodDescriptor } from './method';

export function GetMethodSignatureDescriptor(node: ts.MethodSignature): ts.Expression {
    let returnType: ts.Expression;

    if (node.type) {
        returnType = GetDescriptor(node.type);
    } else {
        returnType = GetNullDescriptor();
    }

    return GetMethodDescriptor(node.name, returnType);
}
