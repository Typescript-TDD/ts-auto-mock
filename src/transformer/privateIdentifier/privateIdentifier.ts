import * as ts from 'typescript';
import { MockPrivatePrefix } from '../mockIdentifier/mockIdentifier';
import { createIdentifier } from '../../typescriptFactory/typescriptFactory';

export function PrivateIdentifier(text: string): ts.Identifier {
  return createIdentifier(`${MockPrivatePrefix}${text}`);
}
