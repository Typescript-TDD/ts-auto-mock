import * as ts from 'typescript';
import { GetMockBlock } from "../../mock/mockBlock";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    const variableDeclarations: Array<ts.VariableDeclaration> = node.members.map((member: ts.TypeElement) => {
        const name = (member.name as ts.Identifier).escapedText;
        return ts.createVariableDeclaration(ts.createIdentifier("_" + name))
    });

    const variableStatement = ts.createVariableStatement([], variableDeclarations);

    const methods: Array<ts.AccessorDeclaration> = node.members.map(
        (member): Array<ts.AccessorDeclaration> =>  {
            return GetMockBlock(member);
        }
    ).reduce((acc, declarations: Array<ts.AccessorDeclaration>) => {
        acc = acc.concat(declarations);

        return acc;
    }, []);

    const returnStatement = ts.createReturn(
	    ts.createObjectLiteral(methods, true)
    );

    const blockArrowFunction = ts.createBlock([variableStatement, returnStatement]);

    const arrowFunction = ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), blockArrowFunction);

    const par = ts.createParen(arrowFunction);

    return ts.createCall(par, [], []);
}