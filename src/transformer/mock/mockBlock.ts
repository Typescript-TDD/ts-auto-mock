import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetDescriptor } from "../descriptor/descriptor";

type Member = ts.ClassElement | ts.TypeElement;

export function GetMockBlock(member: Member, typeChecker: ts.TypeChecker): ts.GetAccessorDeclaration {
	const descriptor: ts.Expression = GetDescriptor(member, typeChecker);
	const returnStatement: ts.ReturnStatement = ts.createReturn(descriptor);
	const body: ts.Block = ts.createBlock([returnStatement]);
	return TypescriptHelper.createGetAccessor(member.name, body);
}