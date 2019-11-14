import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { PropertySignatureCache } from '../property/cache';
import { GetReturnTypeFromBody } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

type functionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(node: functionAssignment, scope: Scope): ts.Expression {
    const property: ts.PropertyName = PropertySignatureCache.instance.get();
    const returnValue: ts.Expression = GetReturnTypeFromBody(node, scope);

    return GetMethodDescriptor(property, returnValue);
}
