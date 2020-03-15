import { TypeChecker } from '../../../src/transformer/typeChecker/typeChecker';
import { getMock } from '../../../src/transformer/mock/mock';
import {
    CustomFunction
} from "../../../src/transformer/matcher/matcher";
import ts from 'typescript';
import { GetProgram } from "../../../src/transformer/program/program";
import { baseTransformer } from '../../../src/transformer/base/base';
import { GetTypeQueryDescriptor } from '../../../src/transformer/descriptor/typeQuery/typeQuery';
import { Scope } from '../../../src/transformer/scope/scope';
import { DefinitelyTypedTransformerLogger } from './logger';

const customFunctions: CustomFunction[] = [
    {
        sourceDts: 'create-definitely-typed-mock.d.ts',
        sourceUrl: '../create-definitely-typed-mock.d.ts',
    }
];

const transformer = baseTransformer(visitNode, customFunctions);
export { transformer };

function visitNode(node: ts.CallExpression, declaration: ts.FunctionDeclaration): ts.Node {
    const typeQueryNode: ts.TypeNode = node.typeArguments[0];

    if (isCreateDefinitelyTypedMock(declaration) && ts.isTypeQueryNode(typeQueryNode)) {
        try {
            return GetTypeQueryDescriptor(typeQueryNode, new Scope());
        } catch {
            const symbol: ts.Symbol = TypeChecker().getSymbolAtLocation(typeQueryNode.exprName);

            const symbolDeclaration: ts.ImportEqualsDeclaration = symbol.declarations[0] as ts.ImportEqualsDeclaration;

            const moduleName: string = ((symbolDeclaration.moduleReference as ts.ExternalModuleReference).expression as ts.StringLiteral).text;
            const moduleWithoutExportsFile: ts.SourceFile = GetProgram().getSourceFiles().find((file: ts.SourceFile) => file.fileName.includes(`@types/${moduleName}/index.d.ts`));

            const compatibleStatements: ts.Statement[] = moduleWithoutExportsFile.statements.filter(
                (statement: ts.Statement) => statement.kind === ts.SyntaxKind.InterfaceDeclaration
                    || statement.kind === ts.SyntaxKind.FunctionDeclaration
                    || statement.kind === ts.SyntaxKind.ClassDeclaration
            );

            if (compatibleStatements.length > 0) {
                return ts.createArrayLiteral(compatibleStatements.map((workingStatement: ts.InterfaceDeclaration | ts.FunctionDeclaration | ts.ClassDeclaration) => {
                    const nodeToMock: ts.TypeReferenceNode = ts.createTypeReferenceNode(workingStatement.name, []);
                    return getMock(nodeToMock, node);
                }));
            }

            DefinitelyTypedTransformerLogger().moduleWithoutValidTypeStatements(moduleName);

            return node;
        }
    }

    return node;
}

function isCreateDefinitelyTypedMock(declaration: ts.FunctionDeclaration): boolean {
    return declaration.name && declaration.name.getText() === 'createDefinitelyTypedMock';
}
