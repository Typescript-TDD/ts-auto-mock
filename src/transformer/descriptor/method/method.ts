import type * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { TypescriptHelper } from '../helper/helper';
import {
  createArrowFunction,
  createBlock,
  createCall,
  createIdentifier,
  createPropertyAccess,
  createReturnStatement,
  createStringLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetMethodDescriptor(
  propertyName: ts.PropertyName,
  returnValue: ts.Expression
): ts.Expression {
  const providerGetMethod: ts.PropertyAccessExpression =
    CreateProviderGetMethod();

  const propertyNameString: string =
    TypescriptHelper.GetStringPropertyName(propertyName);
  const propertyNameStringLiteral: ts.StringLiteral =
    createStringLiteral(propertyNameString);

  const propertyValueFunction: ts.ArrowFunction = createArrowFunction(
    createBlock([createReturnStatement(returnValue)], true)
  );

  return createCall(providerGetMethod, [
    propertyNameStringLiteral,
    propertyValueFunction,
  ]);
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
  return createPropertyAccess(
    createPropertyAccess(
      createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        createIdentifier('Provider')
      ),
      createIdentifier('instance')
    ),
    createIdentifier('getMethod')
  );
}
