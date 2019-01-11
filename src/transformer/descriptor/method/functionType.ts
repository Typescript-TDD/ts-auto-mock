import * as ts from 'typescript';
import { PropertySignatureCache } from "../property/cache";
import { GetMethodDescriptor } from "./method";
import { TypescriptHelper } from "../../helper/helper";

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode): ts.Expression {
    const propertyName: ts.PropertyName = PropertySignatureCache.instance.get();
    
    const property = propertyName ? propertyName : TypescriptHelper.createEmptyProperty().name;

    return GetMethodDescriptor(property, node);
}