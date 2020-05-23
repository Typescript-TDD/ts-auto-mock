import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { PropertySignatureCache } from '../property/cache';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    const propertyName: ts.PropertyName = PropertySignatureCache.instance.get();
    return GenerateRandomStringWithPrefix(propertyName as ts.Identifier, '6');
  }
  return ts.createLiteral('');
}

function GenerateRandomStringWithPrefix(prefix: ts.Identifier, length: string): ts.BinaryExpression {
  return ts.createBinary(
    ts.createStringLiteral(`${prefix.escapedText}`),
    ts.createToken(ts.SyntaxKind.PlusToken),
    ts.createCall(
      ts.createPropertyAccess(
        ts.createCall(
          ts.createPropertyAccess(
            ts.createCall(
              ts.createPropertyAccess(
                ts.createIdentifier('Math'),
                ts.createIdentifier('random')
              ),
              undefined,
              []
            ),
            ts.createIdentifier('toString')
          ),
          undefined,
          [ts.createNumericLiteral('20')]
        ),
        ts.createIdentifier('substr')
      ),
      undefined,
      [
        ts.createNumericLiteral('2'),
        ts.createNumericLiteral(length),
      ]
    )
  );

}
