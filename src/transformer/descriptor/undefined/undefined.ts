import * as ts from 'typescript';

export function GetUndefinedDescriptor(): ts.Expression {
  return ts.factory.createVoidZero();
}
