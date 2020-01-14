import * as ts from 'typescript';

export function GetBooleanFalseDescriptor(): ts.Expression {
    return ts.createLogicalNot(ts.createLiteral(1));
}
