import * as ts from 'typescript';
import {PropertySignatureCache} from "../property/cache";
import {GetMethodDescriptor} from "./method";
import {GetReturnTypeFromBody} from "./bodyReturnType";

type functionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(node: functionAssignment): ts.Expression {
    const property: ts.PropertyName = PropertySignatureCache.instance.get();
    const returnValue = GetReturnTypeFromBody(node);

    return GetMethodDescriptor(property, returnValue);
}
