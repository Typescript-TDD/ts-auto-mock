import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { RandomPropertyAccessor } from '../random/random';
import { IsTsAutoMockRandomEnabled } from '../../../options/random';

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const typesList: ts.LiteralType[] = node.members.map((it: ts.EnumMember) => typeChecker.getTypeAtLocation(it)) as ts.LiteralType[];

  if (IsTsAutoMockRandomEnabled()) {
    const nodesList: ts.Expression[] = typesList.map(({ value }: ts.LiteralType) => ts.createLiteral(value));

    return ts.createCall(RandomPropertyAccessor('enumValue'), [], [...nodesList]);
  }

  if (typesList[0].hasOwnProperty('value')) {
    return ts.createLiteral(typesList[0].value);
  }

  return ts.createLiteral(0);
}
