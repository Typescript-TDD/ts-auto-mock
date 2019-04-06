import * as ts from "typescript";
import {GetMethodDescriptor} from "./method";
import { GetNullDescriptor } from "../null/null";
import { GetDescriptor } from "../descriptor";

export function GetMethodSignatureDescriptor(node: ts.MethodSignature): ts.Expression {
	let returnType: ts.Expression;
	
	if (node.type) {
		returnType = GetDescriptor(node.type);
	} else {
		returnType = GetNullDescriptor();
	}
	
    return GetMethodDescriptor(node.name, returnType);
}
