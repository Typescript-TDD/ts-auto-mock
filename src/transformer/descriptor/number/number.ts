import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { RandomPropertyAccessor } from '../random/random';

export function GetNumberDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return ts.createCall(RandomPropertyAccessor('number'), [], []);
  }
  return ts.createLiteral(0);
}
