import * as ts from 'typescript';
import { TypeScriptTypes } from "./typescriptTypes";

export function TypescriptTypesAdapter(type: TypeScriptTypes): ts.Expression {
    switch (type) {
        case(TypeScriptTypes.Array):
            return ts.createArrayLiteral();
    }
}