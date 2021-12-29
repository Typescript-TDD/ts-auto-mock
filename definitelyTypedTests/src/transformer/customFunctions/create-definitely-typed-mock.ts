import path from 'path';
import type * as ts from 'typescript';
import { customFunctionWithTypeArgument } from '../../../../src/transformer/customFunctions/helpers/custom-function-with-type-argument';
import { GetMockPropertiesFromDeclarations } from '../../../../src/transformer/descriptor/mock/mockProperties';
import { GetPropertiesFromSourceFileOrModuleDeclaration } from '../../../../src/transformer/descriptor/module/module';
import { CustomFunction } from '../../../../src/transformer/matcher/matcher';
import { SetCurrentCreateMock } from '../../../../src/transformer/mock/currentCreateMockNode';
import { getMock } from '../../../../src/transformer/mock/mock';
import { Scope } from '../../../../src/transformer/scope/scope';
import { core } from '../../../../src/transformer/core/core';
import { DefinitelyTypedTransformerLogger } from '../logger';

type CompatibleStatement =
  | ts.InterfaceDeclaration
  | ts.FunctionDeclaration
  | ts.ClassDeclaration
  | ts.ModuleDeclaration;

export const createDefinitelyTypedMockCustomFunction: CustomFunction =
  customFunctionWithTypeArgument(
    'create-definitely-typed-mock.d.ts',
    'createDefinitelyTypedMock',
    (node: ts.CallExpression, nodeToMock: ts.TypeNode): ts.Node => {
      if (core.ts.isTypeQueryNode(nodeToMock)) {
        SetCurrentCreateMock(node);
        const typeChecker: ts.TypeChecker = core.typeChecker;
        const typeQuerySymbol: ts.Symbol | undefined =
          typeChecker.getSymbolAtLocation(nodeToMock.exprName);

        if (!typeQuerySymbol) {
          return getMock(node, { nodeToMock });
        }

        const typeQuerySymbolDeclaration: ts.ImportEqualsDeclaration =
          typeQuerySymbol.declarations?.[0] as ts.ImportEqualsDeclaration;
        const symbolAlias: ts.Symbol | undefined =
          typeChecker.getSymbolAtLocation(typeQuerySymbolDeclaration.name);

        if (!symbolAlias) {
          return getMock(node, { nodeToMock });
        }

        const symbol: ts.Symbol = typeChecker.getAliasedSymbol(symbolAlias);

        if (!symbol.declarations) {
          const moduleName: string = (
            (
              typeQuerySymbolDeclaration.moduleReference as ts.ExternalModuleReference
            ).expression as ts.StringLiteral
          ).text;
          const pathModule: string = path.resolve(moduleName);
          const moduleWithoutExportsFile: ts.SourceFile = core.program
            .getSourceFiles()
            .find(
              (file: ts.SourceFile) =>
                path.relative(
                  file.fileName,
                  path.join(pathModule, 'index.d.ts')
                ) === ''
            ) as ts.SourceFile;

          const compatibleStatements: ts.Statement[] =
            moduleWithoutExportsFile.statements.filter(
              (statement: ts.Statement) =>
                statement.kind === core.ts.SyntaxKind.InterfaceDeclaration ||
                statement.kind === core.ts.SyntaxKind.FunctionDeclaration ||
                statement.kind === core.ts.SyntaxKind.ClassDeclaration ||
                statement.kind === core.ts.SyntaxKind.ModuleDeclaration
            );

          if (compatibleStatements.length > 0) {
            return core.ts.createArrayLiteral(
              compatibleStatements.map(
                (workingStatement: CompatibleStatement) => {
                  const name: ts.Identifier =
                    workingStatement.name as ts.Identifier;
                  const scope = new Scope();

                  if (core.ts.isModuleDeclaration(workingStatement)) {
                    return GetMockPropertiesFromDeclarations(
                      GetPropertiesFromSourceFileOrModuleDeclaration(
                        (workingStatement as any).symbol,
                        scope
                      ),
                      [],
                      scope
                    );
                  }

                  const nodeToMock: ts.TypeReferenceNode =
                    core.ts.createTypeReferenceNode(name, undefined);
                  return getMock(node, { nodeToMock });
                },
                []
              )
            );
          }
          DefinitelyTypedTransformerLogger().moduleWithoutValidTypeStatements(
            moduleName
          );

          return node;
        }

        return getMock(node, { nodeToMock });
      }

      return node;
    }
  );
