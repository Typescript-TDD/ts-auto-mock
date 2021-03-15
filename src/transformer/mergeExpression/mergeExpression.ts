import * as ts from 'typescript';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { ModuleName } from '../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../privateIdentifier/privateIdentifier';
import {
  createCall,
  createIdentifier,
  createPropertyAccess,
} from '../../typescriptFactory/typescriptFactory';

export function mergePropertyAccessor(
  methodName: string
): ts.PropertyAccessExpression {
  return createPropertyAccess(
    createPropertyAccess(
      MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Merge),
      PrivateIdentifier('Merge')
    ),
    createIdentifier(methodName)
  );
}

export function getMockMergeExpression(
  nodeMocked: ts.Expression,
  defaultValues: ts.Expression
): ts.Expression {
  return createCall(mergePropertyAccessor('merge'), [
    nodeMocked,
    defaultValues,
  ]);
}
