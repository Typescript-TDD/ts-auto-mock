import * as ts from 'typescript';
import { TsAutoMockOptions } from '../options/options';
import { CustomFunction } from './matcher/matcher';
import {
  getHydratedMock,
  getMock,
  getMockForList,
  storeRegisterMock,
} from './mock/mock';
import { baseTransformer } from './base/base';

const customFunctions: CustomFunction[] = [
  {
    sourceDts: 'create-mock.d.ts',
    sourceUrl: '../create-mock.d.ts',
  },
  {
    sourceDts: 'create-mock-list.d.ts',
    sourceUrl: '../create-mock-list.d.ts',
  },
  {
    sourceDts: 'register-mock.d.ts',
    sourceUrl: '../register-mock.d.ts',
  },
  {
    sourceDts: 'create-hydrated-mock.d.ts',
    sourceUrl: '../create-hydrated-mock.d.ts',
  },
];

const transformer: (
  program: ts.Program,
  options?: TsAutoMockOptions
) => ts.TransformerFactory<ts.SourceFile> = baseTransformer(
  visitNode,
  customFunctions
);

export { transformer };

function visitNode(
  node: ts.CallExpression & { typeArguments: ts.NodeArray<ts.TypeNode> },
  declaration: ts.FunctionDeclaration
): ts.Node {
  const [nodeToMock]: ts.NodeArray<ts.TypeNode> = node.typeArguments;

  if (isCreateMock(declaration)) {
    return getMock(nodeToMock, node);
  }

  if (isCreateHydratedMock(declaration)) {
    return getHydratedMock(nodeToMock, node);
  }

  if (isCreateMockList(declaration)) {
    return getMockForList(nodeToMock, node);
  }

  if (isRegisterMock(declaration)) {
    return storeRegisterMock(nodeToMock, node);
  }

  return node;
}

function isCreateMock(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name?.getText() === 'createMock';
}

function isCreateHydratedMock(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name?.getText() === 'createHydratedMock';
}

function isCreateMockList(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name?.getText() === 'createMockList';
}

function isRegisterMock(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name?.getText() === 'registerMock';
}
