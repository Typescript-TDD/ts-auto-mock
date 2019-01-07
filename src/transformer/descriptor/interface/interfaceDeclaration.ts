import * as ts from 'typescript';
import { GetMockCall } from "../../mock/mockCall";
import { GetMockProperty } from "../../mock/mockProperty";
import { GetHeritagesMembers } from "../heritage/heritageMembers";

export function GetInterfaceDeclarationDescriptor(node: ts.InterfaceDeclaration): ts.Expression {
    let otherMembers;
    let endMembers;
    
    if (node.heritageClauses) {
		otherMembers = GetHeritagesMembers(node.heritageClauses);
    }
    
    if (otherMembers) {
		endMembers = node.members.concat(otherMembers);
	} else {
		endMembers = node.members;
	}
	
    
    const variableDeclarations: Array<ts.VariableDeclaration> = endMembers.map((member: ts.TypeElement) => {
        return ts.createVariableDeclaration(member.name as ts.Identifier)
    });
    
    const accessorDeclaration: Array<ts.AccessorDeclaration> = endMembers.map(
        (member): Array<ts.AccessorDeclaration> =>  {
            return GetMockProperty(member);
        }
    ).reduce((acc, declarations: Array<ts.AccessorDeclaration>) => {
        acc = acc.concat(declarations);

        return acc;
    }, []);

    return GetMockCall(variableDeclarations, accessorDeclaration);
}