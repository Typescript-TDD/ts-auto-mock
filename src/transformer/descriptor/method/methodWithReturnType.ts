import * as ts from "typescript";
import { GetDescriptor } from "../descriptor";
import { GetMethodDescriptor } from "./method";

type MethodWithReturnType = ts.MethodSignature | ts.MethodDeclaration;

export function GetMethodWithReturnType(node: MethodWithReturnType) {
	const returnValue: ts.Expression = GetDescriptor(node.type);
	return GetMethodDescriptor(node.name, returnValue);
}
