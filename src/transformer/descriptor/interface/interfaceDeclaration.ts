import * as ts from 'typescript';
import { GetMockCall } from "../../mock/mockCall";
import { GetMockProperty } from "../../mock/mockProperty";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    const variableDeclarations: Array<ts.VariableDeclaration> = node.members.map((member: ts.TypeElement) => {
        return ts.createVariableDeclaration(member.name as ts.Identifier)
    });

    const accessorDeclaration: Array<ts.AccessorDeclaration> = node.members.map(
        (member): Array<ts.AccessorDeclaration> =>  {
            return GetMockProperty(member);
        }
    ).reduce((acc, declarations: Array<ts.AccessorDeclaration>) => {
        acc = acc.concat(declarations);

        return acc;
    }, []);

    return GetMockCall(variableDeclarations, accessorDeclaration);
}