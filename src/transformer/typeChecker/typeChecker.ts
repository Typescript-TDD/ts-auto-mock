import * as ts from 'typescript';

let ___typeChecker: ts.TypeChecker = null;

export function SetTypeChecker(typeChecker: ts.TypeChecker): void {
    ___typeChecker = typeChecker;
}

export function TypeChecker(): ts.TypeChecker {
    return ___typeChecker;
}
