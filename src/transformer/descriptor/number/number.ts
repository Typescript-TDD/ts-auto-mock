import type * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { RandomPropertyAccessor } from '../random/random';
import {
  createCall,
  createNumericLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetNumberDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return createCall(RandomPropertyAccessor('number'), []);
  }
  return createNumericLiteral(0);
}
