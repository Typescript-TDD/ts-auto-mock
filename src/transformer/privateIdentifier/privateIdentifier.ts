import * as ts from 'typescript';
import { MockPrivatePrefix } from '../mockIdentifier/mockIdentifier';

export function PrivateIdentifier(text: string): ts.Identifier {
  return ts.createIdentifier(`${MockPrivatePrefix}${text}`);
}
