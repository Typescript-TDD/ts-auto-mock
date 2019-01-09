import * as ts from 'typescript';
import { TypeScriptTypes } from "./typescriptTypes";
import { GetNumberDescriptor } from "../descriptor/number/number";
import { GetArrayDescriptor } from "../descriptor/array/array";
import { GetNullDescriptor } from "../descriptor/null/null";

export function TypescriptTypesAdapter(type: TypeScriptTypes): ts.Expression {
    switch (type) {
        case(TypeScriptTypes.Array):
            return GetArrayDescriptor();
        case(TypeScriptTypes.Number):
            return GetNumberDescriptor();
        default:
            return GetNullDescriptor();
    }
}