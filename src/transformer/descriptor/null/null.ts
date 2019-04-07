import * as ts from 'typescript';

export function GetNullDescriptor(): ts.Expression {
    return ts.createNull();
}
