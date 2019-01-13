import * as ts from 'typescript';
import { TypescriptLibsTypes } from "./typescriptLibsTypes";
import { GetNumberDescriptor } from "../number/number";
import { GetArrayDescriptor } from "../array/array";
import { GetStringDescriptor } from "../string/string";
import { GetBooleanDescriptor } from "../boolean/boolean";
import { GetMockPropertiesFromSymbol } from "../mock/mockProperties";
import { GetEmptyMethodDescriptor } from "../method/method";
import { GetUndefinedDescriptor } from "../undefined/undefined";

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
			return GetMockPropertiesFromSymbol([]);
		case(TypescriptLibsTypes.Function):
			return GetEmptyMethodDescriptor();
		default:
			return GetUndefinedDescriptor();
	}
}