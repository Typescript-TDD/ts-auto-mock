import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { IsTypescriptType } from '../tsLibs/typecriptLibs';
import { TypeChecker} from '../../typeChecker/typeChecker';
import { TypescriptCreator } from '../../helper/creator';
import { GetMockCall } from './mockCall';
import { GetMockPropertiesAssignments, PropertyAssignments } from './mockPropertiesAssignments';
import { PropertyLike } from './propertyLike';
import { SignatureLike } from './signatureLike';

export function GetMockPropertiesFromSymbol(propertiesSymbol: ts.Symbol[], signatures: ReadonlyArray<ts.Signature>, scope: Scope): ts.Expression {
  const properties: PropertyLike[] = propertiesSymbol.map((prop: ts.Symbol) => {
    const typeChecker: ts.TypeChecker = TypeChecker();

    // A property may not have a declaration if has been created dynamically (es. {[key in T]: S};)
    if (!prop.declarations) {
      // Unfortunately this mechanism force us to create a typeNode that cannot be checked (with the typeChecker) from this point.
      // See GetDeclarationFromNode in helper.ts for more information
      const parameterDeclaration: ts.ParameterDeclaration = typeChecker.symbolToParameterDeclaration(prop);
      const type: ts.TypeNode = parameterDeclaration.type;

      return TypescriptCreator.createPropertySignature(prop.getName(), type);
    }
    return prop.declarations[0];
  }) as PropertyLike[];

  const signaturesDeclarations: SignatureLike[] = signatures.map((signature: ts.Signature) => signature.declaration) as SignatureLike[];

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

    return member.modifiers.filter((modifier: ts.Modifier) => modifier.kind === ts.SyntaxKind.PrivateKeyword).length === 0;
  });

  const accessorDeclaration: PropertyAssignments = GetMockPropertiesAssignments(propertiesFilter, scope);

  const signaturesDescriptor: ts.Expression = signatures.length > 0 ? GetDescriptor(signatures[0], scope) : null;
  return GetMockCall(accessorDeclaration, signaturesDescriptor);
}
