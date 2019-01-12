import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { PropertySignatureCache } from "./cache";
type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode): ts.Expression {
	PropertySignatureCache.instance.set(node.name);
	
	if (node.type) {
		return GetDescriptor(node.type);
	}
	
	return GetDescriptor(node.initializer);
}