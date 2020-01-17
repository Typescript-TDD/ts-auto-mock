import * as path from 'path';
import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';

export function isCreateMock(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name && declaration.name.getText() === 'createMock';
}

export function isCreateMockList(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name && declaration.name.getText() === 'createMockList';
}

export function isRegisterMock(declaration: ts.FunctionDeclaration): boolean {
  return declaration.name && declaration.name.getText() === 'registerMock';
}

export function isFromTsAutoMock(signature: ts.Signature): boolean {
  if (!isDeclarationDefined(signature)) {
    return false;
  }

  if (!ts.isFunctionDeclaration(signature.declaration)) {
    return false;
  }

  const createMockTs: string = path.join(__dirname, '../create-mock.d.ts');
  const createMockListTs: string = path.join(__dirname, '../create-mock-list.d.ts');
  const registerMockTs: string = path.join(__dirname, '../register-mock.d.ts');
  const fileName: string = signature.declaration.getSourceFile().fileName;

  const isCreateMockUrl: boolean = path.relative(fileName, createMockTs) === '';
  if (fileName.includes('create-mock.d.ts') && !isCreateMockUrl) {
    TransformerLogger().unexpectedCreateMock(fileName, createMockTs);
  }

  const isCreateMockListUrl: boolean = path.relative(fileName, createMockListTs) === '';
  if (fileName.includes('create-mock-list.d.ts') && !isCreateMockListUrl) {
    TransformerLogger().unexpectedCreateMock(fileName, createMockListTs);
  }

  const isRegisterMockUrl: boolean = path.relative(fileName, registerMockTs) === '';
  if (fileName.includes('register-mock.d.ts') && !isRegisterMockUrl) {
    TransformerLogger().unexpectedCreateMock(fileName, registerMockTs);
  }

  return isCreateMockUrl || isCreateMockListUrl || isRegisterMockUrl;
}

function isDeclarationDefined(signature: ts.Signature): boolean {
  return signature && !!signature.declaration;
}
