import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { PropertySignatureCache } from '../property/cache';
import { GetMethodDescriptor } from './method';

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode | ts.CallSignatureDeclaration, scope: Scope): ts.Expression {
    const property: ts.PropertyName = PropertySignatureCache.instance.get();

    const returnValue: ts.Expression = GetDescriptor(node.type, scope);

    return GetMethodDescriptor(property, returnValue);
}
