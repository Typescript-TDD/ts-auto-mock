import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetDescriptor } from "../descriptor/descriptor";

type Member = ts.ClassElement | ts.TypeElement;

export function GetMockBlock(member: Member): Array<ts.GetAccessorDeclaration | ts.SetAccessorDeclaration> {
	const descriptor: ts.Expression = GetDescriptor(member);
    const name = (member.name as ts.Identifier).escapedText;
	const getExpression = ts.createBinary(ts.createIdentifier("_" + name), ts.SyntaxKind.BarBarToken, descriptor);
	const setExpression = ts.createBinary(ts.createIdentifier("_" + name), ts.SyntaxKind.EqualsToken, ts.createIdentifier("" + name));

	const returnGetStatement: ts.ReturnStatement = ts.createReturn(getExpression);
	const bodyGet: ts.Block = ts.createBlock([returnGetStatement]);

    const returnSetStatement: ts.ReturnStatement = ts.createReturn(setExpression);
    const bodySet: ts.Block = ts.createBlock([returnSetStatement]);

	const getAccessor = TypescriptHelper.createGetAccessor(member.name, bodyGet);
	const setAccessor = TypescriptHelper.createSetAccessor(member.name, bodySet);
	return [getAccessor, setAccessor]
}