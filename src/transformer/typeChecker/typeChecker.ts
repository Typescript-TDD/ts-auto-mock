import * as ts from 'typescript';

let ___typeChecker: ts.TypeChecker = null;

export function SetTypeChecker(_typeChecker: ts.TypeChecker) {
    ___typeChecker = _typeChecker;
}
export function TypeChecker(): ts.TypeChecker {
    return ___typeChecker;
}