import * as ts from 'typescript';
import {
  createArrowFunction,
  createBlock,
  createReturn,
} from '../../../typescriptFactory/typescriptFactory';
/* eslint-disable dot-notation,@typescript-eslint/ban-ts-comment */
export function GetTypeofEnumDescriptor(
  enumDeclaration: ts.EnumDeclaration
): ts.Expression {
  // @ts-ignore
  enumDeclaration['modifiers'] = undefined;
  return createArrowFunction(
    createBlock([enumDeclaration, createReturn(enumDeclaration.name)], true)
  );
}
