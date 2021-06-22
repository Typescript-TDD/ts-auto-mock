import type * as ts from 'typescript';

export function InitCore(typescript: typeof ts, program: ts.Program): void {
  core.ts = typescript;
  core.typeChecker = program.getTypeChecker();
  core.program = program;
}

interface ITsAutoMockCore {
  ts: typeof ts;
  program: ts.Program;
  typeChecker: ts.TypeChecker;
}

export const core: ITsAutoMockCore = {} as ITsAutoMockCore;
