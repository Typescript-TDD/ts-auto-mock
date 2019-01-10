import * as ts from 'typescript';
import { GetMockCall } from "./mockCall";
import { GetMockProperty } from "./mockProperty";

export function GetMockProperties(propertiesSymbol: Array<ts.Symbol>): ts.Expression {
    let properties: Array<ts.Declaration> = propertiesSymbol.map((prop) => {
        return prop.declarations[0];
    });

    properties = properties.filter((member: ts.PropertyDeclaration) => {
        const hasModifiers = !!member.modifiers;

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