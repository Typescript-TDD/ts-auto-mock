import type ts from 'typescript';
import { createIdentifier } from '../../typescriptFactory/typescriptFactory';

export const Identifiers: {
  MockIdentifierGenericParameter: ts.Identifier;
  MockIdentifierGenericParameterIds: ts.Identifier;
  MockIdentifierGenericParameterValue: ts.Identifier;
  MockIdentifierInternalValues: ts.Identifier;
  MockIdentifierObjectReturnValue: ts.Identifier;
  MockIdentifierSetParameterName: ts.Identifier;
  MockCreateMockListLoopStep: ts.Identifier;
  MockCreateMockListLoopArray: ts.Identifier;
} = ({
  MockIdentifierGenericParameter: undefined,
  MockIdentifierGenericParameterIds: undefined,
  MockIdentifierGenericParameterValue: undefined,
  MockIdentifierInternalValues: undefined,
  MockIdentifierObjectReturnValue: undefined,
  MockIdentifierSetParameterName: undefined,
  MockCreateMockListLoopStep: undefined,
  MockCreateMockListLoopArray: undefined,
} as unknown) as {
  MockIdentifierGenericParameter: ts.Identifier;
  MockIdentifierGenericParameterIds: ts.Identifier;
  MockIdentifierGenericParameterValue: ts.Identifier;
  MockIdentifierInternalValues: ts.Identifier;
  MockIdentifierObjectReturnValue: ts.Identifier;
  MockIdentifierSetParameterName: ts.Identifier;
  MockCreateMockListLoopStep: ts.Identifier;
  MockCreateMockListLoopArray: ts.Identifier;
};

export const Strings: {
  MockCallAnonymousText: string;
  MockCallLiteralText: string;
  MockPrivatePrefix: string;
} = {
  MockCallAnonymousText: '*',
  MockCallLiteralText: 'L',
  MockPrivatePrefix: 'ɵ',
};

export function InitIdentifiers(): void {
  Identifiers.MockIdentifierGenericParameter = createIdentifier('t');
  Identifiers.MockIdentifierGenericParameterIds = createIdentifier('i');
  Identifiers.MockIdentifierGenericParameterValue = createIdentifier('w');
  Identifiers.MockIdentifierInternalValues = createIdentifier('d');
  Identifiers.MockIdentifierObjectReturnValue = createIdentifier('m');
  Identifiers.MockIdentifierSetParameterName = createIdentifier('v');
  Identifiers.MockCreateMockListLoopStep = createIdentifier('k');
  Identifiers.MockCreateMockListLoopArray = createIdentifier('s');
}
