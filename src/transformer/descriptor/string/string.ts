import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { PropertySignatureCache } from '../property/cache';
import { RandomPropertyAccessor } from '../random/random';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    const propertyName: ts.PropertyName = PropertySignatureCache.instance.get();
    const length: ts.StringLiteral = ts.createLiteral('6');
    const prefix: ts.StringLiteral = ts.createLiteral(`${(propertyName as ts.Identifier).escapedText}`);
    return ts.createCall(RandomPropertyAccessor('string'), [], [prefix, length]);
  }
  return ts.createLiteral('');
}
