import * as path from 'path';
import * as ts from 'typescript';

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

    if (!isFunctionDeclaration(signature.declaration)) {
        return false;
    }

    const createMockTs: string = path.join(__dirname, `src/transformer/create-mock.ts`);
    const createMockListTs: string = path.join(__dirname, `src/transformer/create-mock-list.ts`);
    const fileName: string = signature.declaration.getSourceFile().fileName;

    return fileName === createMockTs || fileName === createMockListTs;
}

function isFunctionDeclaration(declaration: ts.Declaration): declaration is ts.FunctionDeclaration {
    return ts.isFunctionDeclaration(declaration);
}

function isDeclarationDefined(signature: ts.Signature): boolean {
    return signature && !!signature.declaration;
}
