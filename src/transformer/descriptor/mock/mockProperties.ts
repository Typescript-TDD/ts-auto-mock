import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetDescriptor } from '../descriptor';
import { IsTypescriptType } from '../tsLibs/typecriptLibs';
import { IsNodeJsType } from '../nodeJsTypes/nodeJsTypes';
import { GetMockCall } from './mockCall';
import {
  GetMockPropertiesAssignments,
  PropertyAssignments,
} from './mockPropertiesAssignments';
import { PropertyLike } from './propertyLike';
import { SignatureLike } from './signatureLike';

export function GetMockPropertiesFromSymbol(
  propertiesSymbol: ts.Symbol[],
  signatures: ReadonlyArray<ts.Signature>,
  scope: Scope,
): ts.Expression {
  const properties: PropertyLike[] = propertiesSymbol
    .filter((prop: ts.Symbol) => !!prop.declarations) // Dynamically generated properties (mapped types) do not have declarations
    .map(
      (prop: ts.Symbol) =>
        prop.declarations?.filter(
          (declaration: ts.Declaration) => !core.ts.isSetAccessor(declaration),
        )[0],
    )
    .filter(Boolean) as PropertyLike[];

  const signaturesDeclarations: SignatureLike[] = signatures.map(
    (signature: ts.Signature) => signature.declaration,
  ) as SignatureLike[];

  return GetMockPropertiesFromDeclarations(
    properties,
    signaturesDeclarations,
    scope,
  );
}

export function GetMockPropertiesFromDeclarations(
  list: ReadonlyArray<PropertyLike>,
  signatures: ReadonlyArray<SignatureLike>,
  scope: Scope,
): ts.CallExpression {
  const propertiesFilter: PropertyLike[] = list.filter(
    (member: PropertyLike) => {
      const modifiers:
        | ts.NodeArray<ts.Modifier>
        | ts.NodeArray<ts.ModifierLike>
        | undefined = member.modifiers;

      if (IsTypescriptType(member)) {
        // Workaround to remove any properties coming from typescript/lib
        return false;
      }

      if (IsNodeJsType(member)) {
        // Workaround to remove any properties coming from @types/node globals
        return false;
      }

      if (member.questionToken && !scope.hydrated) {
        return false;
      }

      if (!modifiers) {
        return true;
      }

      return (
        modifiers.filter(
          (modifier: ts.Modifier) =>
            modifier.kind === core.ts.SyntaxKind.PrivateKeyword,
        ).length === 0
      );
    },
  );

  const accessorDeclaration: PropertyAssignments = GetMockPropertiesAssignments(
    propertiesFilter,
    scope,
  );

  const signaturesDescriptor: ts.Expression | null = signatures.length
    ? GetDescriptor(signatures[0], scope)
    : null;
  return GetMockCall(accessorDeclaration, signaturesDescriptor);
}
