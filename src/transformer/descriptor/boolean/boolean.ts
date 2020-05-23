import * as ts from 'typescript';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import { GetBooleanFalseDescriptor } from './booleanFalse';

export function GetBooleanDescriptor(): ts.Expression {
  if (IsTsAutoMockRandomEnabled()) {
    return GetRandomBoolean();
  }
  return GetBooleanFalseDescriptor();
}

function GetRandomBoolean(): ts.PrefixUnaryExpression {
  return ts.createPrefix(
    ts.SyntaxKind.ExclamationToken,
    ts.createCall(
      ts.createPropertyAccess(
        ts.createIdentifier('Math'),
        ts.createIdentifier('round')
      ),
      undefined,
      [ts.createCall(
        ts.createPropertyAccess(
          ts.createIdentifier('Math'),
          ts.createIdentifier('random')
        ),
        undefined,
        []
      )]
    )
  );
}

