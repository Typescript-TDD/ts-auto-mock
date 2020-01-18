import * as ts from 'typescript';

export interface GenericParameter {
  ids: string[];
  value: ts.Expression;
}
