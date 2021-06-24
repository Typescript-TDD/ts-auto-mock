import type * as ts from 'typescript';

export interface ModuleNameIdentifier {
  moduleUrl: string;
  identifier: ts.Identifier;
}
