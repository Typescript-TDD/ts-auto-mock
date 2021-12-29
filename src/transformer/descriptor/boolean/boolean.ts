import type * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { RandomPropertyAccessor } from '../random/random';
import { createCall } from '../../../typescriptFactory/typescriptFactory';
import { GetBooleanFalseDescriptor } from './booleanFalse';

export function GetBooleanDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return createCall(RandomPropertyAccessor('boolean'), []);
  }
  return GetBooleanFalseDescriptor();
}
