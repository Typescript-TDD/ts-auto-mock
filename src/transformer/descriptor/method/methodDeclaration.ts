import * as ts from 'typescript';
import { GetMethodWithReturnType } from "./methodWithReturnType";

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration): ts.Expression {
	return GetMethodWithReturnType(node);
}
