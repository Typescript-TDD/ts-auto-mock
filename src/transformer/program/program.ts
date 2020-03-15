import ts from 'typescript';

let __program: ts.Program;

export function SetProgram(program: ts.Program): void {
  __program = program;
}

export function GetProgram(): ts.Program {
  return __program;
}
