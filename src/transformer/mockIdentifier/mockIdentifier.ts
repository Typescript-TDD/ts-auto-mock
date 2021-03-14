import * as ts from 'typescript';
import { createIdentifier } from '../../typescriptFactory/typescriptFactory';

export const MockIdentifierGenericParameter: ts.Identifier = createIdentifier(
  't'
);
export const MockIdentifierGenericParameterIds: ts.Identifier = createIdentifier(
  'i'
);
export const MockIdentifierGenericParameterValue: ts.Identifier = createIdentifier(
  'w'
);
export const MockIdentifierInternalValues: ts.Identifier = createIdentifier(
  'd'
);
export const MockIdentifierObjectReturnValue: ts.Identifier = createIdentifier(
  'm'
);
export const MockIdentifierSetParameterName: ts.Identifier = createIdentifier(
  'v'
);
export const MockCallAnonymousText: string = '*';
export const MockCallLiteralText: string = 'L';
export const MockPrivatePrefix: string = 'ɵ';

export const MockCreateMockListLoopStep: ts.Identifier = createIdentifier('k');
export const MockCreateMockListLoopArray: ts.Identifier = createIdentifier('s');
