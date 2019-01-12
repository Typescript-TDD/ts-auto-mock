import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { PropertySignatureCache } from "./cache";
import { GetUndefinedDescriptor } from "../undefined/undefined";
type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode): ts.Expression {
	PropertySignatureCache.instance.set(node.name);
	
	if (node.type) {
		if (node.questionToken) {
			return GetUndefinedDescriptor();
		}
		return GetDescriptor(node.type);
	}
	
	return GetDescriptor(node.initializer);
}