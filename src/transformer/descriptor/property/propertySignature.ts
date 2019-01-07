import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';
type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode): ts.Expression {
	return GetDescriptor(node.type);
}