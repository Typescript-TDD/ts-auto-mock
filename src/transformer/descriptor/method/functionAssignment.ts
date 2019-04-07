import * as ts from 'typescript';
import { PropertySignatureCache } from '../property/cache';
import { GetReturnTypeFromBody } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

type functionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(node: functionAssignment): ts.Expression {
    const property: ts.PropertyName = PropertySignatureCache.instance.get();
    const returnValue: ts.Expression = GetReturnTypeFromBody(node);

    return GetMethodDescriptor(property, returnValue);
}
