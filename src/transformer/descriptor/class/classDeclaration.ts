import * as ts from 'typescript';
import { GetMockCall } from "../../mock/mockCall";
import { GetMockProperty } from "../../mock/mockProperty";

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

    const variableDeclarations: Array<ts.VariableDeclaration> = members.map((member: ts.ClassElement) => {
        return ts.createVariableDeclaration(member.name as ts.Identifier)
    });

    const accessorDeclaration: Array<ts.AccessorDeclaration> = members.map(
        (member): Array<ts.AccessorDeclaration> =>  {
            return GetMockProperty(member);
        }
    ).reduce((acc, declarations: Array<ts.AccessorDeclaration>) => {
        acc = acc.concat(declarations);

        return acc;
    }, []);

	return GetMockCall(variableDeclarations, accessorDeclaration);
}