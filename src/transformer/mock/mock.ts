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
import { SetCurrentCreateMock } from './currentCreateMockNode';

function getMockExpression(nodeToMock: ts.TypeNode): ts.Expression {
  return GetDescriptor(nodeToMock, new Scope());
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

export function getMockForList(
  nodeToMock: ts.TypeNode,
  node: ts.CallExpression
): ts.Expression {
  SetCurrentCreateMock(node);
  const mock: ts.Expression = getMockExpression(nodeToMock);
  const lengthLiteral: ts.NumericLiteral = node
    .arguments[0] as ts.NumericLiteral;

  if (!lengthLiteral) {
    return ts.createArrayLiteral([]);
  }

  if (hasDefaultListValues(node)) {
    return getListCallMock(
      node.arguments[0],
      ts.createCall(
        mergePropertyAccessor('mergeIterator'),
        [],
        [mock, node.arguments[1], MockCreateMockListLoopStep]
      )
    );
  }

  return getListCallMock(node.arguments[0], mock);
}

function getListCallMock(
  expression: ts.Expression,
  mockExpr: ts.Expression
): ts.CallExpression {
  return ts.createCall(
    ts.createParen(
      ts.createFunctionExpression(
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        undefined,
        ts.createBlock(
          [
            ts.createVariableStatement(
              undefined,
              ts.createVariableDeclarationList(
                [
                  ts.createVariableDeclaration(
                    MockCreateMockListLoopArray,
                    undefined,
                    ts.createArrayLiteral([], false)
                  ),
                ],
                ts.NodeFlags.Const
              )
            ),
            ts.createFor(
              ts.createVariableDeclarationList(
                [
                  ts.createVariableDeclaration(
                    MockCreateMockListLoopStep,
                    undefined,
                    ts.createNumericLiteral('0')
                  ),
                ],
                ts.NodeFlags.Let
              ),
              ts.createBinary(
                MockCreateMockListLoopStep,
                ts.createToken(ts.SyntaxKind.LessThanToken),
                expression
              ),
              ts.createPostfix(
                MockCreateMockListLoopStep,
                ts.SyntaxKind.PlusPlusToken
              ),
              ts.createBlock(
                [
                  ts.createExpressionStatement(
                    ts.createCall(
                      ts.createPropertyAccess(
                        MockCreateMockListLoopArray,
                        ts.createIdentifier('push')
                      ),
                      undefined,
                      [mockExpr]
                    )
                  ),
                ],
                true
              )
            ),
            ts.createReturn(MockCreateMockListLoopArray),
          ],
          true
        )
      )
    ),
    undefined,
    []
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
    return ts.createEmptyStatement();
  }
}
