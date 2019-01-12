import * as ts from 'typescript';
import { GetMethodDescriptor } from "./method";
import { GetDescriptor } from "../descriptor";

type Methods = ts.MethodSignature | ts.MethodDeclaration;

export function GetMethodDeclarationDescriptor(node: Methods): ts.Expression {
	const returnValue: ts.Expression = GetDescriptor(node.type);
    return GetMethodDescriptor(node.name, returnValue);
}