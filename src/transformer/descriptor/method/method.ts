import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';

export function GetMethodDescriptor(propertyName: ts.PropertyName, returnValue: ts.Expression): ts.Expression {
    const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

    const propertyNameAsString: ts.StringLiteral = ts.createStringLiteral('' + (propertyName as ts.Identifier).escapedText);

    const propertyValueFunction: ts.ArrowFunction  = TypescriptCreator.createArrowFunction(ts.createBlock(
        [ts.createReturn(returnValue)],
        true,
    ));

    return ts.createCall(providerGetMethod, [], [propertyNameAsString, propertyValueFunction]);
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
    return ts.createPropertyAccess(
        ts.createPropertyAccess(
            ts.createPropertyAccess(
                MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
                ts.createIdentifier('Provider'),
            ),
            ts.createIdentifier('instance')),
        ts.createIdentifier('getMethod'));
}
