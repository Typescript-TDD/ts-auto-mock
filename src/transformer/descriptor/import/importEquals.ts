import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetImportEqualsDescriptor(node: ts.ImportEqualsDeclaration, scope: Scope): ts.Expression {
    if (ts.isExternalModuleReference(node.moduleReference)) {
        const s: ts.Symbol = TypeChecker().getSymbolAtLocation(node.name);
        const symbol: ts.Symbol = TypeChecker().getAliasedSymbol(s);
        const externalModuleDeclaration: ts.Declaration = symbol.declarations[0]; // for now

        if (ts.isSourceFile(externalModuleDeclaration) || ts.isModuleDeclaration(externalModuleDeclaration)) {
            const maybe: ts.Symbol[] = TypeChecker().getExportsOfModule(symbol);

            return GetMockPropertiesFromSymbol(maybe, [], scope);
        }

        return GetDescriptor(externalModuleDeclaration, scope);
    }

    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.moduleReference);
    return GetDescriptor(declaration, scope);
}
