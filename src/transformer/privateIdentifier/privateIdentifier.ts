import type * as ts from 'typescript';
import { Strings } from '../mockIdentifier/mockIdentifier';
import { createIdentifier } from '../../typescriptFactory/typescriptFactory';

export function PrivateIdentifier(text: string): ts.Identifier {
  return createIdentifier(`${Strings.MockPrivatePrefix}${text}`);
}
