import type * as ts from 'typescript';
import { CustomFunction } from '../matcher/matcher';
import { storeRegisterMock } from '../mock/mock';
import { customFunctionWithTypeArgument } from './helpers/custom-function-with-type-argument';

export const registerMockCustomFunction: CustomFunction =
  customFunctionWithTypeArgument(
    'register-mock.d.ts',
    'registerMock',
    (node: ts.CallExpression, nodeToMock: ts.TypeNode): ts.Node =>
      storeRegisterMock(nodeToMock, node),
  );
