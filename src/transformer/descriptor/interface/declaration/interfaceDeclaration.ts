import * as ts from 'typescript';
import { GetMockBlock } from "../../../mock/mockBlock";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration, typeChecker: ts.TypeChecker): ts.Expression {
	return ts.createObjectLiteral(
		node.members.map(
			(member): ts.ObjectLiteralElementLike =>  {
				return GetMockBlock(member, typeChecker);
			}
		)
	)
}