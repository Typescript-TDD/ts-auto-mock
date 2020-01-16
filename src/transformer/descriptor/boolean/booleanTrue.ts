import * as ts from 'typescript';

export function GetBooleanTrueDescriptor(): ts.Expression {
    return ts.createLogicalNot(ts.createLiteral(0));
}
