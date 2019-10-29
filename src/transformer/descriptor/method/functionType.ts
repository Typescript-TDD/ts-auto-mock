import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { PropertySignatureCache } from '../property/cache';
import { GetMethodDescriptor } from './method';

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode | ts.CallSignatureDeclaration): ts.Expression {
    const property: ts.PropertyName = PropertySignatureCache.instance.get();

    const returnValue: ts.Expression = GetDescriptor(node.type);

    return GetMethodDescriptor(property, returnValue);
}
