import * as ts from 'typescript';

export namespace TypescriptHelper {
	export function createGetAccessor(name: ts.PropertyName, block: ts.Block): ts.GetAccessorDeclaration {
		return ts.createGetAccessor([], [], name, [], undefined, block)
	}

    export function createSetAccessor(name: ts.PropertyName, block: ts.Block): ts.SetAccessorDeclaration {
        const nameIdentifier = "_" + (name as ts.Identifier).escapedText;
	    const parameterDeclaration = ts.createParameter([], [], undefined, nameIdentifier, undefined, undefined, undefined);
        return ts.createSetAccessor([], [], name, [parameterDeclaration], block);
    }

    export function createArrowFunction(block: ts.Block): ts.ArrowFunction {
	    return ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
    }
}