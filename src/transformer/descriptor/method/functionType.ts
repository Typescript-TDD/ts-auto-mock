import * as ts from 'typescript';
import { PropertySignatureCache } from "../property/cache";
import { GetMethodDescriptor } from "./method";

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode): ts.Expression {
    const name: ts.PropertyName = PropertySignatureCache.instance.get();

    return GetMethodDescriptor(name, node);
}