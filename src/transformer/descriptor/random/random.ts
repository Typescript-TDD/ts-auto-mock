import type * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';
import {
  createIdentifier,
  createPropertyAccess,
} from '../../../typescriptFactory/typescriptFactory';

export function RandomPropertyAccessor(
  methodName: string
): ts.PropertyAccessExpression {
  return createPropertyAccess(
    createPropertyAccess(
      MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Random),
      PrivateIdentifier('Random')
    ),
    createIdentifier(methodName)
  );
}
