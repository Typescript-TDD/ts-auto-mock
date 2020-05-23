import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { PropertySignatureCache } from '../property/cache';

export function GetStringDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    const propertyName: ts.PropertyName = PropertySignatureCache.instance.get();
    return generateRandomStringWithPrefix(propertyName as ts.Identifier);
  }
  return ts.createLiteral('');
}

function generateRandomStringWithPrefix(prefix: ts.Identifier): ts.BinaryExpression {
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
        ts.createNumericLiteral('6'),
      ]
    )
  );

}
