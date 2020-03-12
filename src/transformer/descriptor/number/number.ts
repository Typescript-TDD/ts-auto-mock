import { GetTsAutoMockRandomValuesOptions } from '../../../options/randomValues';
import * as ts from 'typescript';

export function GetNumberDescriptor(): ts.Expression {
  const value: number = GetTsAutoMockRandomValuesOptions() ? Math.floor(Math.random() * 10000) : 0;

  return ts.createLiteral(value);
}
