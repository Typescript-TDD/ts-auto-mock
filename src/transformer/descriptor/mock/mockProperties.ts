import * as ts from 'typescript';
import { IsTypescriptType } from '../tsLibs/typecriptLibs';
import { GetMockCall } from './mockCall';
import { GetMockDeclarationName } from './mockDeclarationName';
import { GetMockProperty } from './mockProperty';

export function GetMockPropertiesFromSymbol(propertiesSymbol: ts.Symbol[], signatures: ReadonlyArray<ts.Signature>): ts.Expression {
    const properties: ts.Declaration[] = propertiesSymbol.map((prop: ts.Symbol) => {
        return prop.declarations[0];
    });

    return GetMockPropertiesFromDeclarations(properties, signatures);
}

export function GetMockPropertiesFromDeclarations(list: ts.Declaration[], signatures: ReadonlyArray<ts.Signature>): ts.CallExpression {
    const properties: ts.Declaration[] = list.filter((member: ts.PropertyDeclaration) => {
        const hasModifiers: boolean = !!member.modifiers;

        if (IsTypescriptType(member)) { // This is a current workaround to safe fail extends of TypescriptLibs
            return false;
        }

        if (!hasModifiers) {
            return true;
        }

        return member.modifiers.filter((modifier: ts.Modifier) => {
            return modifier.kind === ts.SyntaxKind.PrivateKeyword;
        }).length === 0;
    });

    const variableDeclarations: ts.VariableDeclaration[] = properties.map((member: ts.PropertyDeclaration) => {
        const name: ts.Identifier = GetMockDeclarationName(member.name as ts.Identifier);
        return ts.createVariableDeclaration(name);
    });

    const accessorDeclaration: ts.AccessorDeclaration[] = properties.map(
        (member: ts.Declaration): ts.AccessorDeclaration[] =>  {
            return GetMockProperty(member as ts.PropertyDeclaration);
        },
    ).reduce((acc: ts.AccessorDeclaration[], declarations: ts.AccessorDeclaration[]) => {
        acc = acc.concat(declarations);

        return acc;
    }, []);

    return GetMockCall(variableDeclarations, accessorDeclaration, signatures);
}
