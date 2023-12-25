import type * as ts from 'typescript';
import { createArrayLiteral } from '../../typescriptFactory/typescriptFactory';
import { CustomFunction } from '../matcher/matcher';
import { getMock } from '../mock/mock';
import { customFunctionWithTypeArgument } from './helpers/custom-function-with-type-argument';

export const createMockListCustomFunction: CustomFunction =
  customFunctionWithTypeArgument(
    'create-mock-list.d.ts',
    'createMockList',
    (node: ts.CallExpression, nodeToMock: ts.TypeNode): ts.Node => {
      const lengthExpression: ts.Expression = node.arguments[0];

      if (!lengthExpression) {
        return createArrayLiteral([]);
      }

      return getMock(node, {
        nodeToMock,
        amount: lengthExpression,
        defaultValues: getDefaultValues(node),
      });
    },
  );

function getDefaultValues(node: ts.CallExpression): ts.Expression | undefined {
  return !!node.arguments.length ? node.arguments[1] : undefined;
}
