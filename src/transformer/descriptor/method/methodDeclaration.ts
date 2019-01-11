import * as ts from 'typescript';
import { GetMethodDescriptor } from "./method";

type Methods = ts.MethodSignature | ts.MethodDeclaration;

export function GetMethodDeclarationDescriptor(node: Methods): ts.Expression {
    return GetMethodDescriptor(node.name, node);
}