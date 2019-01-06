import * as ts from 'typescript';
import { GetMockBlock } from "../../mock/mockBlock";

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration, typeChecker: ts.TypeChecker): ts.Expression {
	const members = node.members.filter((member: ts.ClassElement) => {
		const hasModifiers = !!member.modifiers;
		
		if (!hasModifiers) {
			return true;
		}
		
		return member.modifiers.filter((modifier: ts.Modifier) => {
			return modifier.kind === ts.SyntaxKind.PrivateKeyword
		}).length === 0;
	});
	
	return ts.createObjectLiteral(
		members.map(
			(member): ts.ObjectLiteralElementLike =>  {
				return GetMockBlock(member, typeChecker);
			}
		)
	)
}