import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration): ts.Expression {
  const typeChecker: ts.TypeChecker = TypeChecker();
  const type: ts.LiteralType = typeChecker.getTypeAtLocation(node.members[0]) as ts.LiteralType;

  if (type.hasOwnProperty('value')) {
    return ts.createLiteral(type.value);
  }

  return ts.createLiteral(0);
}
