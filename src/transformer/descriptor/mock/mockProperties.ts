import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { IsTypescriptType } from '../tsLibs/typecriptLibs';
import { GetMockCall } from './mockCall';
import { GetMockPropertiesAssignments, PropertyAssignments } from './mockPropertiesAssignments';
import { PropertyLike } from './propertyLike';
import { SignatureLike } from './signatureLike';

export function GetMockPropertiesFromSymbol(propertiesSymbol: ts.Symbol[], signatures: ReadonlyArray<ts.Signature>, scope: Scope): ts.Expression {
  const properties: PropertyLike[] = propertiesSymbol
    .filter((prop: ts.Symbol) => !!prop.declarations) // Dynamically generated properties (mapped types) do not have declarations
    .map((prop: ts.Symbol) => prop.declarations[0]) as PropertyLike[];

  const signaturesDeclarations: SignatureLike[] = signatures.map((signature: ts.Signature) => signature.declaration) as SignatureLike[];

  return GetMockPropertiesFromDeclarations(properties, signaturesDeclarations, scope);
}

export function GetMockPropertiesFromDeclarations(list: ReadonlyArray<PropertyLike>, signatures: ReadonlyArray<SignatureLike>, scope: Scope): ts.CallExpression {
  const propertiesFilter: PropertyLike[] = list.filter((member: PropertyLike) => {
    const modifiers: ts.ModifiersArray | undefined = member.modifiers;

    if (IsTypescriptType(member)) { // This is a current workaround to safe fail extends of TypescriptLibs
      return false;
    }

    if (!modifiers) {
      return true;
    }

    return modifiers.filter((modifier: ts.Modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword).length === 0;
  });

  const accessorDeclaration: PropertyAssignments = GetMockPropertiesAssignments(propertiesFilter, scope);

  return GetMockCall(accessorDeclaration, signatures, scope);
}
