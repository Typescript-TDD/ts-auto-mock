import type * as ts from 'typescript';
import {
  createCall,
  createIdentifier,
  createNumericLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetBigIntDescriptor(): ts.CallExpression {
  return createCall(createIdentifier('BigInt'), [createNumericLiteral('0')]);
}
