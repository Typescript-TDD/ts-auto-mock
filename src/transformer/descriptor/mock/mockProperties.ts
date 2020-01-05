import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { IsTypescriptType } from '../tsLibs/typecriptLibs';
import { GetMockCall } from './mockCall';
import { GetMockProperty } from './mockProperty';
import { PropertyLike } from './propertyLike';
import { SignatureLike } from './signatureLike';

export function GetMockPropertiesFromSymbol(propertiesSymbol: ts.Symbol[], signatures: ReadonlyArray<ts.Signature>, scope: Scope): ts.Expression {
    const properties: PropertyLike[] = propertiesSymbol.map((prop: ts.Symbol) => {
        return prop.declarations[0];
    }) as PropertyLike[];

    const signaturesDeclarations: SignatureLike[] = signatures.map((signature: ts.Signature) => {
        return signature.declaration;
    }) as SignatureLike[];

    return GetMockPropertiesFromDeclarations(properties, signaturesDeclarations, scope);
}

export function GetMockPropertiesFromDeclarations(list: ReadonlyArray<PropertyLike>, signatures: ReadonlyArray<SignatureLike>, scope: Scope): ts.CallExpression {
    const propertiesFilter: PropertyLike[] = list.filter((member: PropertyLike) => {
        const hasModifiers: boolean = !!member.modifiers;

        if (IsTypescriptType(member)) { // This is a current workaround to safe fail extends of TypescriptLibs
            return false;
        }

        if (!hasModifiers) {
            return true;
        }

        return member.modifiers.filter((modifier: ts.Modifier) => {
            return modifier.kind === ts.SyntaxKind.PrivateKeyword;
        }).length === 0;
    });

    const accessorDeclaration: ts.PropertyAssignment[] = propertiesFilter.map(
        (member: PropertyLike): ts.PropertyAssignment => {
            return GetMockProperty(member, scope);
        },
    );

    const signaturesDescriptor: ts.Expression = signatures.length > 0 ? GetDescriptor(signatures[0], scope) : null;
    return GetMockCall(accessorDeclaration, signaturesDescriptor);
}
