import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';

export function RandomPropertyAccessor(methodName: string): ts.CallExpression {
  return ts.createCall(ts.createPropertyAccess(
    ts.createPropertyAccess(
      MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Random),
      PrivateIdentifier('Random')
    ),
    ts.createIdentifier(methodName),
  ), [], []);

}
