import type * as ts from 'typescript';

export function InitCore(typescript: typeof ts, program: ts.Program): void {
  Object.defineProperty(_core, 'ts', { value: typescript });
  Object.defineProperty(_core, 'typeChecker', {
    value: program.getTypeChecker(),
  });
  Object.defineProperty(_core, 'program', { value: program });
}

interface ITsAutoMockCore {
  ts: typeof ts;
  program: ts.Program;
  typeChecker: ts.TypeChecker;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const _core: ITsAutoMockCore = {
  get ts(): typeof ts {
    throw new Error('Core was not initialized');
  },
  get program(): ts.Program {
    throw new Error('Core was not initialized');
  },
  get typeChecker(): ts.TypeChecker {
    throw new Error('Core was not initialized');
  },
};

export const core: Readonly<ITsAutoMockCore> = _core;
