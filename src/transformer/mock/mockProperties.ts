import * as ts from 'typescript';
import { TypeChecker } from "../typeChecker/typeChecker";
import { GetMockCall } from "./mockCall";
import { GetMockProperty } from "./mockProperty";

export function GetMockProperties(type: ts.Type): ts.Expression {
    const typeChecker = TypeChecker();

    let properties: Array<ts.Declaration> = typeChecker.getPropertiesOfType(type).map((prop) => {
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