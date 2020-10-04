import * as ts from 'typescript';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { ModuleName } from '../mockDefiner/modules/moduleName';
import { PrivateIdentifier } from '../privateIdentifier/privateIdentifier';

export function mergePropertyAccessor(
  methodName: string
): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createPropertyAccess(
      MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Merge),
      PrivateIdentifier('Merge')
    ),
    ts.createIdentifier(methodName)
  );
}

export function getMockMergeExpression(
  nodeMocked: ts.Expression,
  defaultValues: ts.Expression
): ts.Expression {
  return ts.createCall(
    mergePropertyAccessor('merge'),
    [],
    [nodeMocked, defaultValues]
  );
}
