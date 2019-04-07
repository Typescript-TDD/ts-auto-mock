import * as ts from 'typescript';

export function GetBooleanFalseDescriptor(): ts.Expression {
    return ts.createLiteral(false);
}
