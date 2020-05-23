import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return ts.createLiteral(Math.random().toString(20).substr(2, 6));
  }
  return ts.createLiteral('');
}
