import * as path from 'path';
import slash from 'slash';
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

    const createMockTs: string = createPath(__dirname, '..', 'create-mock.d.ts');
    const createMockListTs: string = createPath(__dirname, '..', 'create-mock-list.d.ts');
    const fileName: string = signature.declaration.getSourceFile().fileName;

    if (fileName.indexOf('create-mock.d.ts') > -1 && fileName !== createMockTs) {
        TransformerLogger().unexpectedCreateMock(fileName, createMockTs);
    }

    if (fileName.indexOf('create-mock-list.d.ts') > -1 && fileName !== createMockListTs) {
        TransformerLogger().unexpectedCreateMock(fileName, createMockListTs);
    }

    return fileName === createMockTs || fileName === createMockListTs;
}

function isDeclarationDefined(signature: ts.Signature): boolean {
    return signature && !!signature.declaration;
}

function createPath(...args: string[]): string {
    const joinedPath: string = path.join(...args);
    return slash(joinedPath);
}
