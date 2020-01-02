import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromDeclarations, PropertyLike } from '../mock/mockProperties';

export function GetModuleDescriptor(node: ts.NamedDeclaration, scope: Scope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();

    const symbolAlias: ts.Symbol = typeChecker.getSymbolAtLocation(node.name);
    const symbol: ts.Symbol = typeChecker.getAliasedSymbol(symbolAlias);
    const externalModuleDeclaration: ts.NamedDeclaration = symbol.declarations[0];

    if (ts.isSourceFile(externalModuleDeclaration) || ts.isModuleDeclaration(externalModuleDeclaration)) {
        const moduleExports: ts.Symbol[] = typeChecker.getExportsOfModule(symbol);

        const properties: PropertyLike[] = moduleExports.map((prop: ts.Symbol): PropertyLike => {
            const originalSymbol: ts.Symbol = TypescriptHelper.GetAliasedSymbolSafe(prop);
            const originalDeclaration: ts.NamedDeclaration = originalSymbol.declarations[0];
            const declaration: ts.Declaration = prop.declarations[0];
            if (ts.isExportAssignment(declaration)) {
                return TypescriptCreator.createProperty('default', ts.createTypeQueryNode(originalDeclaration.name as ts.Identifier));
            }
            return TypescriptCreator.createProperty(originalDeclaration.name as ts.Identifier, ts.createTypeQueryNode(originalDeclaration.name as ts.Identifier));
        });

        return GetMockPropertiesFromDeclarations(properties, [], scope);
    }

    return GetDescriptor(ts.createTypeQueryNode(externalModuleDeclaration.name as ts.Identifier), scope);
}
