import * as ts from 'typescript';
import { GetDescriptor } from "../../descriptor";
import { TypescriptHelper } from "../../../helper/helper";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration, typeChecker: ts.TypeChecker): ts.Expression {
	return ts.createObjectLiteral(
		node.members.map(
			(member): ts.ObjectLiteralElementLike =>  {
				const descriptor: ts.Expression = GetDescriptor(member, typeChecker);
				const returnStatement: ts.ReturnStatement = ts.createReturn(descriptor);
				const body: ts.Block = ts.createBlock([returnStatement]);
				return TypescriptHelper.createGetAccessor(member.name, body);
			}
		)
	)
}