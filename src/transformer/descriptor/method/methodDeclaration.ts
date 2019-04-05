import * as ts from 'typescript';
import { GetMethodDescriptor } from "./method";
import { GetDescriptor } from "../descriptor";
import {GetReturnTypeFromBody} from "./bodyReturnType";

type Methods = ts.MethodSignature | ts.MethodDeclaration;

export function GetMethodSignatureDescriptor(node: Methods): ts.Expression {
    const returnType: ts.Expression = GetDescriptor(node.type);
    return GetMethodDescriptor(node.name, returnType);
}

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration): ts.Expression {
    let returnType: ts.Expression;

    if (node.type) {
        returnType = GetDescriptor(node.type);
    } else {
        returnType = GetReturnTypeFromBody(node);
    }

    return GetMethodDescriptor(node.name, returnType);
}