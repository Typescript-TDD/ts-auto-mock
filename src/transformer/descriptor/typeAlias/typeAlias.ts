import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";
export function GetTypeAliasDescriptor(node: ts.TypeAliasDeclaration): ts.Expression {
	return GetDescriptor(node.type);
}