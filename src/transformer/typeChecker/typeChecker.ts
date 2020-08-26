import * as ts from 'typescript';

let tsAutoMockTypeChecker: ts.TypeChecker | null = null;

export function SetTypeChecker(typeChecker: ts.TypeChecker): void {
  tsAutoMockTypeChecker = typeChecker;
}

export function TypeChecker(): ts.TypeChecker {
  if (!tsAutoMockTypeChecker) {
    throw new Error('SetTypeChecker() must be called prior to TypeChecker()!');
  }

  return tsAutoMockTypeChecker;
}
