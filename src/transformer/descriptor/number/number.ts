import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';

export function GetNumberDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return GenerateRandomNumber();
  }
  return ts.createLiteral(0);
}

const RANDOM_MAX_VALUE: number = 10000;

function GenerateRandomNumber(): ts.BinaryExpression {
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
        ts.createLiteral(RANDOM_MAX_VALUE),
        ts.createToken(ts.SyntaxKind.MinusToken),
        ts.createPrefix(
          ts.SyntaxKind.MinusToken, ts.createLiteral(RANDOM_MAX_VALUE)
        )
      ))
    ),
    ts.createToken(ts.SyntaxKind.PlusToken),
    ts.createPrefix(
      ts.SyntaxKind.MinusToken,
      ts.createLiteral(RANDOM_MAX_VALUE)
    )
  );
}
