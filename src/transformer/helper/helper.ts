import * as ts from 'typescript';

export namespace TypescriptHelper {
	export function createGetAccessor(name: ts.PropertyName, block: ts.Block) {
		return ts.createGetAccessor([], [], name, [], undefined, block)
	}
}