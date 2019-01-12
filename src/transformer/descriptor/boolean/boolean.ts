import * as ts from 'typescript';
import { GetBooleanFalseDescriptor } from "./booleanFalse";

export function GetBooleanDescriptor(): ts.Expression {
	return GetBooleanFalseDescriptor();
}