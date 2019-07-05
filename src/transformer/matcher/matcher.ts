import * as path from 'path';
import * as ts from 'typescript';
import { TransformerLogger } from '../logger/transformerLogger';

export function isCreateMock(declaration: ts.FunctionDeclaration): boolean {
    return declaration.name && declaration.name.getText() === 'createMock';
}

export function isCreateMockList(declaration: ts.FunctionDeclaration): boolean {
    return declaration.name && declaration.name.getText() === 'createMockList';
}

export function isFromTsAutoMock(signature: ts.Signature): boolean {
    if (!isDeclarationDefined(signature)) {
        return false;
    }

    if (!ts.isFunctionDeclaration(signature.declaration)) {
        return false;
    }

    const createMockTs: string = path.join(__dirname, `../create-mock.d.ts`);
    const createMockListTs: string = path.join(__dirname, `../create-mock-list.d.ts`);
    const fileName: string = signature.declaration.getSourceFile().fileName;

    const isCreateMockUrl: boolean = fileName.indexOf('create-mock.d.ts') > -1 && path.relative(fileName, createMockTs) === '';
    if (!isCreateMockUrl) {
        TransformerLogger().unexpectedCreateMock(fileName, createMockTs);
    }

    const isCreateMockListUrl: boolean = fileName.indexOf('create-mock-list.d.ts') > -1 && path.relative(fileName, createMockListTs) === '';
    if (!isCreateMockListUrl) {
        TransformerLogger().unexpectedCreateMock(fileName, createMockListTs);
    }

    return isCreateMockUrl || isCreateMockListUrl;
}

function isDeclarationDefined(signature: ts.Signature): boolean {
    return signature && !!signature.declaration;
}
