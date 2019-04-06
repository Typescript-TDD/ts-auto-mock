import * as ts from "typescript";
import {GetMethodDescriptor} from "./method";
import { GetNullDescriptor } from "../null/null";
import { GetDescriptor } from "../descriptor";

export function GetMethodSignatureDescriptor(node: ts.MethodSignature): ts.Expression {
	const hasReturnValue = node.type;
	
	if (hasReturnValue) {
		return GetMethodDescriptor(node.name, GetDescriptor(node.type));
	}
	
    return GetMethodDescriptor(node.name, GetNullDescriptor());
}
