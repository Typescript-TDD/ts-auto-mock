import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
import { PropertySignatureCache } from "./cache";
type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode): ts.Expression {
    PropertySignatureCache.instance.set(node.name);
	return GetDescriptor(node.type);
}