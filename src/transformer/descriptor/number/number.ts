import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';

export function GetNumberDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return generateRandomNumber();
  }
  return ts.createLiteral(0);
}

function generateRandomNumber(): ts.BinaryExpression {
  return ts.createBinary(
    ts.createBinary(
      ts.createCall(
        ts.createPropertyAccess(
          ts.createIdentifier('Math'),
          ts.createIdentifier('random')
        ),
        undefined,
        []
      ),
      ts.createToken(ts.SyntaxKind.AsteriskToken),
      ts.createParen(ts.createBinary(
        ts.createNumericLiteral('10000'),
        ts.createToken(ts.SyntaxKind.MinusToken),
        ts.createPrefix(
          ts.SyntaxKind.MinusToken,
          ts.createNumericLiteral('10000')
        )
      ))
    ),
    ts.createToken(ts.SyntaxKind.PlusToken),
    ts.createPrefix(
      ts.SyntaxKind.MinusToken,
      ts.createNumericLiteral('10000')
    )
  );
}
