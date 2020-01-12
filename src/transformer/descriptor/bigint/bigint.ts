import * as ts from 'typescript';

export function GetBigIntDescriptor(): ts.CallExpression {
    return ts.createCall(
        ts.createIdentifier('BigInt'),
        undefined,
        [ts.createNumericLiteral('0')],
    );

}
