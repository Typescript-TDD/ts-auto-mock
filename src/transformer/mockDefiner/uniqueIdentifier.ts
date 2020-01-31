import * as ts from 'typescript';

export function PrivateIdentifier(text: string) {
    return ts.createIdentifier(`ɵ${text}`);
}