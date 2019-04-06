import * as ts from "typescript";
import {GetDescriptor} from "../descriptor";
import {GetMethodDescriptor} from "./method";

type Methods = ts.MethodSignature | ts.MethodDeclaration;

export function GetMethodSignatureDescriptor(node: Methods): ts.Expression {
    const returnType: ts.Expression = GetDescriptor(node.type);
    return GetMethodDescriptor(node.name, returnType);
}