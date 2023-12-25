import type * as ts from 'typescript';
import {
  createArrowFunction,
  createBlock,
  createReturn,
} from '../../../typescriptFactory/typescriptFactory';
import { core } from '../../core/core';
export function GetTypeofEnumDescriptor(
  enumDeclaration: ts.EnumDeclaration
): ts.Expression {
  const declaration = core.ts.factory.createEnumDeclaration(
    undefined,
    enumDeclaration.name,
    enumDeclaration.members
  );
  return createArrowFunction(
    createBlock([declaration, createReturn(enumDeclaration.name)], true)
  );
}
