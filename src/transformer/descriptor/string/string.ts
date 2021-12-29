import type * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { PropertySignatureCache } from '../property/cache';
import { RandomPropertyAccessor } from '../random/random';
import { TypescriptHelper } from '../helper/helper';
import {
  createCall,
  createStringLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    const propertyName: string = TypescriptHelper.GetStringPropertyName(
      PropertySignatureCache.instance.get()
    );
    const prefix: ts.StringLiteral = createStringLiteral(propertyName);
    return createCall(RandomPropertyAccessor('string'), [prefix]);
  }
  return createStringLiteral('');
}
