import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { PropertySignatureCache } from '../property/cache';
import { RandomPropertyAccessor } from '../random/random';
import { TypescriptHelper } from '../helper/helper';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    const propertyName: string = TypescriptHelper.GetStringPropertyName(PropertySignatureCache.instance.get());
    const prefix: ts.StringLiteral = ts.createLiteral(propertyName);
    return ts.createCall(RandomPropertyAccessor('string'), [], [prefix]);
  }
  return ts.createLiteral('');
}
