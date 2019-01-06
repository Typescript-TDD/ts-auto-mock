import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";

export function GetUnionDescriptor(node: ts.UnionTypeNode, typeChecker: ts.TypeChecker): ts.Expression {
	return GetDescriptor(node.types[0], typeChecker);
}