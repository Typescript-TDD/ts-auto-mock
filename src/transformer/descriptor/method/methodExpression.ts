import * as ts from 'typescript';

export function GetMethodExpression(block: ts.Block): ts.Expression {
    return ts.createFunctionExpression([], null, undefined, [], [], undefined, block);
}

export function GetEmptyMethodExpression(): ts.Expression {
    const block = ts.createBlock([]);
    return GetMethodExpression(block);
}