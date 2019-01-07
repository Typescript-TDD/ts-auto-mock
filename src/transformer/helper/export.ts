import * as ts from 'typescript';

export interface ExportWithIdentifier {
  exportDeclaration: ts.FunctionDeclaration;
  identifier: ts.Identifier;
}

export function createFactoryExport(
	factoryName: string,
	newMockInstanceExpression: ts.Expression
): ExportWithIdentifier {
  const identifier = ts.createIdentifier(factoryName);

	return {
    exportDeclaration: ts.createFunctionDeclaration(
      [],
      [ ts.createToken(ts.SyntaxKind.ExportKeyword) ],
      undefined,
      identifier,
      undefined,
      [],
      undefined,
      ts.createBlock([ ts.createReturn(newMockInstanceExpression) ])
    ),
    identifier: identifier
  };
}
