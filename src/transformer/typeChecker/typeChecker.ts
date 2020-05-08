import * as ts from 'typescript';

let ___typeChecker: ts.TypeChecker | null = null;

export function SetTypeChecker(typeChecker: ts.TypeChecker): void {
  ___typeChecker = typeChecker;
}

export function TypeChecker(): ts.TypeChecker {
  if (!___typeChecker) {
    throw new Error('SetTypeChecker() must be called prior to TypeChecker()!');
  }

  return ___typeChecker;
}
