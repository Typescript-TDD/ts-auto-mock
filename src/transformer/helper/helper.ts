import * as ts from 'typescript';

export namespace TypescriptHelper {
	export function createGetAccessor(name: ts.PropertyName, block: ts.Block): ts.GetAccessorDeclaration {
		return ts.createGetAccessor([], [], name, [], undefined, block)
	}

    export function createSetAccessor(name: ts.PropertyName, block: ts.Block): ts.SetAccessorDeclaration {
        const nameIdentifier = (name as ts.Identifier);
	    const parameterDeclaration = ts.createParameter([], [], undefined, nameIdentifier, undefined, undefined, undefined);
        return ts.createSetAccessor([], [], name, [parameterDeclaration], block);
    }
}