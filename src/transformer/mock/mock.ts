import * as ts from 'typescript';
import { Logger } from '../../logger/logger';
import { ArrayHelper } from '../array/array';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { getMockMergeExpression, getMockMergeIteratorExpression } from '../mergeExpression/mergeExpression';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Scope } from '../scope/scope';

function getMockExpression(nodeToMock: ts.TypeNode): ts.Expression {
  return GetDescriptor(nodeToMock, new Scope());
}

function hasDefaultValues(node: ts.CallExpression): boolean {
  return node.arguments.length && !!node.arguments[0];
}

function hasDefaultListValues(node: ts.CallExpression): boolean {
  return !!node.arguments[1];
}

function getNumberFromNumericLiteral(numericLiteral: ts.NumericLiteral): number {
  const numericLiteralNumber: number = parseInt(numericLiteral.text, 10);
  return numericLiteralNumber > 0 ? numericLiteralNumber : 0;
}

function getMockMergeListExpression(mock: ts.Expression, length: number, defaultValues: ts.Expression): ts.Expression[] {
  return ArrayHelper.ArrayFromLength(length).map((index: number) => getMockMergeIteratorExpression(mock, defaultValues, ts.createNumericLiteral('' + index)));
}

function getMockListExpression(mock: ts.Expression, length: number): ts.Expression[] {
  return ArrayHelper.ArrayFromLength(length).map(() => mock);
}

export function getMock(nodeToMock: ts.TypeNode, node: ts.CallExpression): ts.Expression {
  const mockExpression: ts.Expression = getMockExpression(nodeToMock);

  if (hasDefaultValues(node)) {
    return getMockMergeExpression(mockExpression, node.arguments[0]);
  }

  return mockExpression;
}

export function getMockForList(nodeToMock: ts.TypeNode, node: ts.CallExpression): ts.ArrayLiteralExpression {
  const mock: ts.Expression = getMockExpression(nodeToMock);
  const lengthLiteral: ts.NumericLiteral = node.arguments[0] as ts.NumericLiteral;

  if (!lengthLiteral) {
    return ts.createArrayLiteral([]);
  }

  const length: number = getNumberFromNumericLiteral(lengthLiteral);

  if (hasDefaultListValues(node)) {
    const mockMergeList: ts.Expression[] = getMockMergeListExpression(mock, length, node.arguments[1]);

    return ts.createArrayLiteral(mockMergeList);
  }

  const mockList: ts.Expression[] = getMockListExpression(mock, length);

  return ts.createArrayLiteral(mockList);
}

export function storeRegisterMock(typeToMock: ts.TypeNode, node: ts.CallExpression): ts.Node {
  if (ts.isTypeReferenceNode(typeToMock)) {
    const factory: ts.FunctionExpression = node.arguments[0] as ts.FunctionExpression;
    MockDefiner.instance.storeRegisterMockFor(TypescriptHelper.GetDeclarationFromNode(typeToMock.typeName), factory);
  } else {
    Logger('RegisterMock').error('registerMock can be used only to mock type references.');
  }

  return ts.createEmptyStatement();
}
