import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';

export function GetBigIntDescriptor(): ts.CallExpression {
  return TypescriptCreator.createCall(
    ts.createIdentifier('BigInt'),
    [ts.createNumericLiteral('0')],
  );

}
