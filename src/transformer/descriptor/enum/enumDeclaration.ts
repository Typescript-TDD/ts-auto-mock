import type * as ts from 'typescript';
import { core } from '../../core/core';
import { RandomPropertyAccessor } from '../random/random';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';
import {
  createCall,
  createNumericLiteral,
  createStringLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetEnumDeclarationDescriptor(
  node: ts.EnumDeclaration,
): ts.Expression {
  const typeChecker: ts.TypeChecker = core.typeChecker;

  if (IsTsAutoMockRandomEnabled()) {
    const nodesList: ts.Expression[] = node.members.map(
      (member: ts.EnumMember, index: number) =>
        getEnumMemberValue(typeChecker, member, index),
    );

    return createCall(RandomPropertyAccessor('enumValue'), nodesList);
  }

  return getEnumMemberValue(typeChecker, node.members[0]);
}

function getEnumMemberValue(
  typeChecker: ts.TypeChecker,
  member: ts.EnumMember,
  defaultValue: string | number = 0,
): ts.Expression {
  const value: string | number =
    typeChecker.getConstantValue(member) || defaultValue;

  if (typeof value === 'number') {
    return createNumericLiteral(value);
  }

  return createStringLiteral(value);
}
