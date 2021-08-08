import type * as ts from 'typescript';
import { CustomFunction } from '../matcher/matcher';
import { getMock } from '../mock/mock';
import { customFunctionWithTypeArgument } from './helpers/custom-function-with-type-argument';

export const createHydratedMockCustomFunction: CustomFunction =
  customFunctionWithTypeArgument(
    'create-hydrated-mock.d.ts',
    'createHydratedMock',
    (node: ts.CallExpression, nodeToMock: ts.TypeNode): ts.Node =>
      getMock(node, {
        nodeToMock,
        hydrated: true,
        defaultValues: getDefaultValues(node),
      })
  );

function getDefaultValues(node: ts.CallExpression): ts.Expression | undefined {
  return !!node.arguments.length ? node.arguments[0] : undefined;
}
