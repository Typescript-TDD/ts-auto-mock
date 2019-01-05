import { GetDescriptor } from "../descriptor";
import * as ts from 'typescript';

export function GetPropertySignatureDescriptor(node: ts.PropertySignature, typeChecker: ts.TypeChecker): ts.Expression {
	return GetDescriptor(node.type, typeChecker);
}