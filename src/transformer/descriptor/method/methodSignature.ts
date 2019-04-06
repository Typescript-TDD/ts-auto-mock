import * as ts from "typescript";
import { GetMethodDescriptor } from "./method";
import { GetNullDescriptor } from "../null/null";
import { GetMethodWithReturnType } from "./methodWithReturnType";

export function GetMethodSignature(node: ts.MethodSignature) {
	const hasReturnValue = node.type;
	
	if (hasReturnValue) {
		return GetMethodWithReturnType(node);
	}
	
	const returnValue: ts.Expression = GetNullDescriptor();
	return GetMethodDescriptor(node.name, returnValue)
}
