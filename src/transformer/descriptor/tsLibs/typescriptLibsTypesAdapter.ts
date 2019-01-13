import * as ts from 'typescript';
import { TypescriptLibsTypes } from "./typescriptLibsTypes";
import { GetNumberDescriptor } from "../number/number";
import { GetArrayDescriptor } from "../array/array";
import { GetNullDescriptor } from "../null/null";
import { GetStringDescriptor } from "../string/string";
import { GetBooleanDescriptor } from "../boolean/boolean";
import { GetMockProperties } from "../mock/mockProperties";
import { TypescriptHelper } from "../helper/helper";

export function TypescriptLibsTypesAdapter(type: TypescriptLibsTypes): ts.Expression {
    switch (type) {
        case(TypescriptLibsTypes.Array):
        case(TypescriptLibsTypes.ReadonlyArray):
            return GetArrayDescriptor();
        case(TypescriptLibsTypes.Number):
            return GetNumberDescriptor();
        case(TypescriptLibsTypes.String):
            return GetStringDescriptor();
        case(TypescriptLibsTypes.Boolean):
            return GetBooleanDescriptor();
        case(TypescriptLibsTypes.Object):
            return GetMockProperties([]);
        case(TypescriptLibsTypes.Function):
            return TypescriptHelper.createEmptyFunctionExpression();
        default:
            return GetNullDescriptor();
    }
}