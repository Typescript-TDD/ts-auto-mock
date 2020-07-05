import ts from 'typescript';

let tsAutoMockProgram: ts.Program;

export function SetProgram(program: ts.Program): void {
  tsAutoMockProgram = program;
}

export function GetProgram(): ts.Program {
  return tsAutoMockProgram;
}
