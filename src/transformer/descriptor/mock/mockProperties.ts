import * as ts from 'typescript';
import { GetMockCall } from "./mockCall";
import { GetMockProperty } from "./mockProperty";
import { IsTypescriptType } from '../tsLibs/typecriptLibs';

export function GetMockPropertiesFromSymbol(propertiesSymbol: Array<ts.Symbol>): ts.Expression {
    let properties: Array<ts.Declaration> = propertiesSymbol.map((prop) => {
        return prop.declarations[0];
    });
    
    return GetMockPropertiesFromDeclarations(properties);
}

export function GetMockPropertiesFromDeclarations(list: Array<ts.Declaration>) {
	const properties = list.filter((member: ts.PropertyDeclaration) => {
		const hasModifiers = !!member.modifiers;
		
		if (IsTypescriptType(member)) { // This is a current workaround to safe fail extends of TypescriptLibs
			return false;
		}

		if (!hasModifiers) {
			return true;
		}

		return member.modifiers.filter((modifier: ts.Modifier) => {
			return modifier.kind === ts.SyntaxKind.PrivateKeyword
		}).length === 0;
	});
	
	const variableDeclarations: Array<ts.VariableDeclaration> = properties.map((member: ts.PropertyDeclaration) => {
		return ts.createVariableDeclaration(member.name as ts.Identifier);
	});
	
	const accessorDeclaration: Array<ts.AccessorDeclaration> = properties.map(
		(member): Array<ts.AccessorDeclaration> =>  {
			return GetMockProperty(member as ts.PropertyDeclaration);
		}
	).reduce((acc, declarations: Array<ts.AccessorDeclaration>) => {
		acc = acc.concat(declarations);
		
		return acc;
	}, []);
	
	return GetMockCall(variableDeclarations, accessorDeclaration);
}