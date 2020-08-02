import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { TypescriptHelper } from '../helper/helper';

export function GetMethodDescriptor(
  propertyName: ts.PropertyName,
  returnValue: ts.Expression
): ts.Expression {
  const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

  const propertyNameString: string = TypescriptHelper.GetStringPropertyName(
    propertyName
  );
  const propertyNameStringLiteral: ts.StringLiteral = ts.createStringLiteral(
    propertyNameString
  );

  const propertyValueFunction: ts.ArrowFunction = TypescriptCreator.createArrowFunction(
    ts.createBlock([ts.createReturn(returnValue)], true)
  );

  return TypescriptCreator.createCall(providerGetMethod, [
    propertyNameStringLiteral,
    propertyValueFunction,
  ]);
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        ts.createIdentifier('Provider')
      ),
      ts.createIdentifier('instance')
    ),
    ts.createIdentifier('getMethod')
  );
}
