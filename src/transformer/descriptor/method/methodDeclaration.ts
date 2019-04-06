import * as ts from 'typescript';
import {GetMethodDescriptor} from "./method";
import {GetDescriptor} from "../descriptor";
import {GetReturnTypeFromBody} from "./bodyReturnType";

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration): ts.Expression {
    let returnType: ts.Expression;

    if (node.type) {
        returnType = GetDescriptor(node.type);
    } else {
        returnType = GetReturnTypeFromBody(node);
    }

    return GetMethodDescriptor(node.name, returnType);
}
