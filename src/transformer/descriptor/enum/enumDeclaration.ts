import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { RandomPropertyAccessor } from '../random/random';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';

export function GetEnumDeclarationDescriptor(
  node: ts.EnumDeclaration
): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();

  if (IsTsAutoMockRandomEnabled()) {
    const nodesList: ts.Expression[] = node.members.map(
      (member: ts.EnumMember, index: number) =>
        getEnumMemberValue(typeChecker, member, index)
    );

    return ts.createCall(
      RandomPropertyAccessor('enumValue'),
      [],
      [...nodesList]
    );
  }

  return getEnumMemberValue(typeChecker, node.members[0]);
}

function getEnumMemberValue(
  typeChecker: ts.TypeChecker,
  member: ts.EnumMember,
  defaultValue: string | number = 0
): ts.Expression {
  return ts.createLiteral(typeChecker.getConstantValue(member) || defaultValue);
}
