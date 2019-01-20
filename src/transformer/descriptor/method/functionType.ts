import * as ts from 'typescript';
import { PropertySignatureCache } from "../property/cache";
import { GetMethodDescriptor } from "./method";
import { GetDescriptor } from "../descriptor";

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode): ts.Expression {
	const property: ts.PropertyName = PropertySignatureCache.instance.get();

	const returnValue: ts.Expression = GetDescriptor(node.type);
	
    return GetMethodDescriptor(property, returnValue);
}