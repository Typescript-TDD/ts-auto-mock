import type * as ts from 'typescript';
import { Logger } from '../../logger/logger';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import {
  getMockMergeExpression,
  mergePropertyAccessor,
} from '../mergeExpression/mergeExpression';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Scope } from '../scope/scope';
import { Identifiers } from '../mockIdentifier/mockIdentifier';
import {
  createArrayLiteral,
  createBinaryExpression,
  createBlock,
  createCall,
  createOmittedExpression,
  createExpressionStatement,
  createForStatement,
  createIdentifier,
  createIIFE,
  createNumericLiteral,
  createPostfix,
  createPropertyAccess,
  createPunctuationToken,
  createReturn,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
} from '../../typescriptFactory/typescriptFactory';
import { core } from '../core/core';
import { SetCurrentCreateMock } from './currentCreateMockNode';

export interface CreateMockOptions {
  nodeToMock: ts.TypeNode;
  hydrated?: boolean;
  defaultValues?: ts.Expression;
  amount?: ts.Expression;
}

export function getMock(
  node: ts.CallExpression,
  options: CreateMockOptions,
): ts.Expression {
  SetCurrentCreateMock(node);
  const mockExpression: ts.Expression = getMockExpression(options);

  if (!!options.amount) {
    return getListOfMocks(
      mockExpression,
      options as CreateMockOptions & { amount: ts.Expression },
    );
  }

  return getSingleMock(options, mockExpression);
}

export function storeRegisterMock(
  typeToMock: ts.TypeNode,
  node: ts.CallExpression,
): ts.Node {
  SetCurrentCreateMock(node);
  if (core.ts.isTypeReferenceNode(typeToMock)) {
    const factory: ts.FunctionExpression = node
      .arguments[0] as ts.FunctionExpression;
    return MockDefiner.instance.registerMockFor(
      TypescriptHelper.GetDeclarationFromNode(typeToMock.typeName),
      factory,
    );
  } else {
    Logger('RegisterMock').error(
      'registerMock can be used only to mock type references.',
    );
    return createOmittedExpression();
  }
}

function getSingleMock(
  options: CreateMockOptions,
  mockExpression: ts.Expression,
): ts.Expression {
  if (!!options.defaultValues) {
    return getMockMergeExpression(mockExpression, options.defaultValues);
  }

  return mockExpression;
}

function getMockExpression(options: CreateMockOptions): ts.Expression {
  const scope: Scope = new Scope();
  scope.hydrated = !!options.hydrated;

  return GetDescriptor(options.nodeToMock, scope);
}

function getListOfMocks(
  mock: ts.Expression,
  options: CreateMockOptions & { amount: ts.Expression },
): ts.Expression {
  if (!!options.defaultValues) {
    return getListCallMock(
      options.amount,
      createCall(mergePropertyAccessor('mergeIterator'), [
        mock,
        options.defaultValues,
        Identifiers.MockCreateMockListLoopStep,
      ]),
    );
  }

  return getListCallMock(options.amount, mock);
}

function getListCallMock(
  expression: ts.Expression,
  mockExpr: ts.Expression,
): ts.CallExpression {
  return createIIFE(
    createBlock(
      [
        createVariableStatement(
          createVariableDeclarationList(
            [
              createVariableDeclaration(
                Identifiers.MockCreateMockListLoopArray,
                createArrayLiteral([], false),
              ),
            ],
            core.ts.NodeFlags.Const,
          ),
        ),
        createForStatement(
          createVariableDeclarationList(
            [
              createVariableDeclaration(
                Identifiers.MockCreateMockListLoopStep,
                createNumericLiteral('0'),
              ),
            ],
            core.ts.NodeFlags.Let,
          ),
          createBinaryExpression(
            Identifiers.MockCreateMockListLoopStep,
            createPunctuationToken(core.ts.SyntaxKind.LessThanToken),
            expression,
          ),
          createPostfix(
            Identifiers.MockCreateMockListLoopStep,
            core.ts.SyntaxKind.PlusPlusToken,
          ),
          createBlock(
            [
              createExpressionStatement(
                createCall(
                  createPropertyAccess(
                    Identifiers.MockCreateMockListLoopArray,
                    createIdentifier('push'),
                  ),
                  [mockExpr],
                ),
              ),
            ],
            true,
          ),
        ),
        createReturn(Identifiers.MockCreateMockListLoopArray),
      ],
      true,
    ),
  );
}
