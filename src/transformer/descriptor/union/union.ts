import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";

export function GetUnionDescriptor(node: ts.UnionTypeNode): ts.Expression {
	return GetDescriptor(node.types[0]);
}