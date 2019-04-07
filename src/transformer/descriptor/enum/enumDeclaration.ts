import * as ts from 'typescript';
import { TypeChecker } from '../../typeChecker/typeChecker';

export function GetEnumDeclarationDescriptor(node: ts.EnumDeclaration): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.LiteralType = typeChecker.getTypeAtLocation(node.members[0]) as ts.LiteralType;

    return ts.createLiteral(type.value);
}
