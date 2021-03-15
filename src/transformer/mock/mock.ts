import * as ts from 'typescript';
import { Logger } from '../../logger/logger';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import {
  getMockMergeExpression,
  mergePropertyAccessor,
} from '../mergeExpression/mergeExpression';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Scope } from '../scope/scope';
import {
  MockCreateMockListLoopArray,
  MockCreateMockListLoopStep,
} from '../mockIdentifier/mockIdentifier';
import {
  createArrayLiteral,
  createBinaryExpression,
  createBlock,
  createCall,
  createEmptyStatement,
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
import { SetCurrentCreateMock } from './currentCreateMockNode';

function getMockExpression(nodeToMock: ts.TypeNode): ts.Expression {
  return GetDescriptor(nodeToMock, new Scope());
}

function getMockHydratedExpression(nodeToMock: ts.TypeNode): ts.Expression {
  const scope: Scope = new Scope();
  scope.hydrated = true;
  return GetDescriptor(nodeToMock, scope);
}

function hasDefaultValues(node: ts.CallExpression): boolean {
  return !!node.arguments.length && !!node.arguments[0];
}

function hasDefaultListValues(node: ts.CallExpression): boolean {
  return !!node.arguments[1];
}

export function getMock(
  nodeToMock: ts.TypeNode,
  node: ts.CallExpression
): ts.Expression {
  SetCurrentCreateMock(node);

  const mockExpression: ts.Expression = getMockExpression(nodeToMock);

  if (hasDefaultValues(node)) {
    return getMockMergeExpression(mockExpression, node.arguments[0]);
  }

  return mockExpression;
}

export function getHydratedMock(
  nodeToMock: ts.TypeNode,
  node: ts.CallExpression
): ts.Expression {
  SetCurrentCreateMock(node);

  const mockExpression: ts.Expression = getMockHydratedExpression(nodeToMock);

  if (hasDefaultValues(node)) {
    return getMockMergeExpression(mockExpression, node.arguments[0]);
  }

  return mockExpression;
}

export function getMockForList(
  nodeToMock: ts.TypeNode,
  node: ts.CallExpression
): ts.Expression {
  SetCurrentCreateMock(node);
  const mock: ts.Expression = getMockExpression(nodeToMock);
  const lengthLiteral: ts.NumericLiteral = node
    .arguments[0] as ts.NumericLiteral;

  if (!lengthLiteral) {
    return createArrayLiteral([]);
  }

  if (hasDefaultListValues(node)) {
    return getListCallMock(
      node.arguments[0],
      createCall(mergePropertyAccessor('mergeIterator'), [
        mock,
        node.arguments[1],
        MockCreateMockListLoopStep,
      ])
    );
  }

  return getListCallMock(node.arguments[0], mock);
}

function getListCallMock(
  expression: ts.Expression,
  mockExpr: ts.Expression
): ts.CallExpression {
  return createIIFE(
    createBlock(
      [
        createVariableStatement(
          createVariableDeclarationList(
            [
              createVariableDeclaration(
                MockCreateMockListLoopArray,
                createArrayLiteral([], false)
              ),
            ],
            ts.NodeFlags.Const
          )
        ),
        createForStatement(
          createVariableDeclarationList(
            [
              createVariableDeclaration(
                MockCreateMockListLoopStep,
                createNumericLiteral('0')
              ),
            ],
            ts.NodeFlags.Let
          ),
          createBinaryExpression(
            MockCreateMockListLoopStep,
            createPunctuationToken(ts.SyntaxKind.LessThanToken),
            expression
          ),
          createPostfix(
            MockCreateMockListLoopStep,
            ts.SyntaxKind.PlusPlusToken
          ),
          createBlock(
            [
              createExpressionStatement(
                createCall(
                  createPropertyAccess(
                    MockCreateMockListLoopArray,
                    createIdentifier('push')
                  ),
                  [mockExpr]
                )
              ),
            ],
            true
          )
        ),
        createReturn(MockCreateMockListLoopArray),
      ],
      true
    )
  );
}

export function storeRegisterMock(
  typeToMock: ts.TypeNode,
  node: ts.CallExpression
): ts.Node {
  SetCurrentCreateMock(node);
  if (ts.isTypeReferenceNode(typeToMock)) {
    const factory: ts.FunctionExpression = node
      .arguments[0] as ts.FunctionExpression;
    return MockDefiner.instance.registerMockFor(
      TypescriptHelper.GetDeclarationFromNode(typeToMock.typeName),
      factory
    );
  } else {
    Logger('RegisterMock').error(
      'registerMock can be used only to mock type references.'
    );
    return createEmptyStatement();
  }
}
