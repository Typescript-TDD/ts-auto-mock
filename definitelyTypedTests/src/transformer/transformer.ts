import { TypeChecker } from '../../../src/transformer/typeChecker/typeChecker';
import { getMock } from '../../../src/transformer/mock/mock';
import {
    CustomFunction
} from "../../../src/transformer/matcher/matcher";
import * as ts from 'typescript';
import { GetProgram } from "../../../src/transformer/program/program";
import { baseTransformer } from '../../../src/transformer/base/base';
import { DefinitelyTypedTransformerLogger } from './logger';
import * as path from 'path';
import { GetPropertiesFromSourceFileOrModuleDeclaration } from '../../../src/transformer/descriptor/module/module';
import { Scope } from '../../../src/transformer/scope/scope';
import { GetMockPropertiesFromDeclarations } from '../../../src/transformer/descriptor/mock/mockProperties';
import { SetCurrentCreateMock } from '../../../src/transformer/mock/currentCreateMockNode';

const customFunctions: CustomFunction[] = [
    {
        sourceDts: 'create-definitely-typed-mock.d.ts',
        sourceUrl: '../create-definitely-typed-mock.d.ts',
    }
];

const transformer = baseTransformer(visitNode, customFunctions);
export { transformer };

type CompatibleStatement = ts.InterfaceDeclaration | ts.FunctionDeclaration | ts.ClassDeclaration | ts.ModuleDeclaration;

function visitNode(node: ts.CallExpression & { typeArguments: ts.NodeArray<ts.TypeNode> }, declaration: ts.FunctionDeclaration): ts.Node {
    const [nodeToMock]: ts.NodeArray<ts.TypeNode> = node.typeArguments;

    if (isCreateDefinitelyTypedMock(declaration) && ts.isTypeQueryNode(nodeToMock)) {
        SetCurrentCreateMock(node);
        const typeChecker: ts.TypeChecker = TypeChecker();
        const typeQuerySymbol: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(nodeToMock.exprName);

        if (!typeQuerySymbol) {
            return getMock(nodeToMock, node);
        }

        const typeQuerySymbolDeclaration: ts.ImportEqualsDeclaration = typeQuerySymbol.declarations[0] as ts.ImportEqualsDeclaration;
        const symbolAlias: ts.Symbol | undefined = typeChecker.getSymbolAtLocation(typeQuerySymbolDeclaration.name);

        if (!symbolAlias) {
            return getMock(nodeToMock, node);
        }

        const symbol: ts.Symbol = typeChecker.getAliasedSymbol(symbolAlias);

        if (!symbol.declarations) {
            const moduleName: string =
                ((typeQuerySymbolDeclaration.moduleReference as ts.ExternalModuleReference).expression as ts.StringLiteral).text;
            const pathModule: string = path.resolve(moduleName);
            const moduleWithoutExportsFile: ts.SourceFile = GetProgram().getSourceFiles().find((file: ts.SourceFile) =>
                path.relative(file.fileName, path.join(pathModule, 'index.d.ts')) === ''
            ) as ts.SourceFile;

            const compatibleStatements: ts.Statement[] = moduleWithoutExportsFile.statements.filter(
                (statement: ts.Statement) => statement.kind === ts.SyntaxKind.InterfaceDeclaration
                    || statement.kind === ts.SyntaxKind.FunctionDeclaration
                    || statement.kind === ts.SyntaxKind.ClassDeclaration
                    || statement.kind === ts.SyntaxKind.ModuleDeclaration
            );

            if (compatibleStatements.length > 0) {
                return ts.createArrayLiteral(compatibleStatements.map(
                    (workingStatement: CompatibleStatement) => {
                    const name: ts.Identifier = workingStatement.name as ts.Identifier;
                    const scope = new Scope();

                    if (ts.isModuleDeclaration(workingStatement)) {
                        return GetMockPropertiesFromDeclarations(
                            GetPropertiesFromSourceFileOrModuleDeclaration((workingStatement as any).symbol, scope),
                            [],
                            scope
                        );
                    }

                    const nodeToMock: ts.TypeReferenceNode = ts.createTypeReferenceNode(name, undefined);
                    return getMock(nodeToMock, node);

                }, []));
            }
            DefinitelyTypedTransformerLogger().moduleWithoutValidTypeStatements(moduleName);

            return node;
        }

        return getMock(nodeToMock, node);
    }

    return node;
}

function isCreateDefinitelyTypedMock(declaration: ts.FunctionDeclaration): boolean {
    return !!declaration.name && declaration.name.getText() === 'createDefinitelyTypedMock';
}
