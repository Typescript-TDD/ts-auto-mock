import * as ts from 'typescript';

export function PrivateIdentifier(text: string): ts.Identifier {
  return ts.createIdentifier(`ɵ${text}`);
}
