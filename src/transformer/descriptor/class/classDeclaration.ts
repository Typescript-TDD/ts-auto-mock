import * as ts from 'typescript';
import { GetMockBlock } from "../../mock/mockBlock";

export function GetClassDeclarationDescriptor(node: ts.ClassDeclaration): ts.Expression {
	const members = node.members.filter((member: ts.ClassElement) => {
		const hasModifiers = !!member.modifiers;
		
		if (!hasModifiers) {
			return true;
		}
		
		return member.modifiers.filter((modifier: ts.Modifier) => {
			return modifier.kind === ts.SyntaxKind.PrivateKeyword
		}).length === 0;
	});

	const statements = [];

	if (members.length) {
        const variableDeclarations: Array<ts.VariableDeclaration> = members.map((member: ts.ClassElement) => {
            const name = (member.name as ts.Identifier).escapedText;
            return ts.createVariableDeclaration(ts.createIdentifier("_" + name))
        });

        const variableStatement = ts.createVariableStatement([], variableDeclarations);
        statements.push(variableStatement);
    }

    const methods: Array<ts.AccessorDeclaration> = members.map(
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

    statements.push(returnStatement);

    const blockArrowFunction = ts.createBlock(statements);

    const arrowFunction = ts.createArrowFunction([], [], [], undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), blockArrowFunction);

    const par = ts.createParen(arrowFunction);

    return ts.createCall(par, [], []);
}