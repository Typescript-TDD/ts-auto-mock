import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { RandomPropertyAccessor } from '../random/random';
import { GetBooleanFalseDescriptor } from './booleanFalse';

export function GetBooleanDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return ts.createCall(RandomPropertyAccessor('boolean'), [], []);
  }
  return GetBooleanFalseDescriptor();
}
