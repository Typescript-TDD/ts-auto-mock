import { GetTsAutoMockRandomValuesOptions } from '../../../options/randomValues';
import * as ts from 'typescript';
import { v4 } from 'uuid';

export function GetStringDescriptor(): ts.Expression {
  const value: string = GetTsAutoMockRandomValuesOptions() ? v4() : '';

  return ts.createLiteral(value);
}
