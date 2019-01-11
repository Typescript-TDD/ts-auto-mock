import * as ts from 'typescript';
import { TypeScriptTypes } from "./typescriptTypes";
import { GetNumberDescriptor } from "../descriptor/number/number";
import { GetArrayDescriptor } from "../descriptor/array/array";
import { GetNullDescriptor } from "../descriptor/null/null";
import { GetStringDescriptor } from "../descriptor/string/string";
import { GetBooleanDescriptor } from "../descriptor/boolean/boolean";
import { GetMockProperties } from "../mock/mockProperties";
import { TypescriptHelper } from "../helper/helper";

export function TypescriptTypesAdapter(type: TypeScriptTypes): ts.Expression {
    switch (type) {
        case(TypeScriptTypes.Array):
            return GetArrayDescriptor();
        case(TypeScriptTypes.Number):
            return GetNumberDescriptor();
        case(TypeScriptTypes.String):
            return GetStringDescriptor();
        case(TypeScriptTypes.Boolean):
            return GetBooleanDescriptor();
        case(TypeScriptTypes.Object):
            return GetMockProperties([]);
        case(TypeScriptTypes.Function):
            return TypescriptHelper.createEmptyFunctionExpression();
        default:
            return GetNullDescriptor();
    }
}