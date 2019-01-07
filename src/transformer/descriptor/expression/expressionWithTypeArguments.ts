import * as ts from 'typescript';
import { GetDescriptor } from "../descriptor";

export function GetExpressionWithTypeArgumentsDescriptor(node: ts.ExpressionWithTypeArguments): ts.Expression {
	return GetDescriptor(node.expression);
}
