import { PropertyName } from 'typescript';
import * as ts from 'typescript';

export namespace TypescriptCreator {
  export function createArrowFunction(block: ts.ConciseBody, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.ArrowFunction {
    return ts.createArrowFunction([], [], parameter, undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
  }

  export function createFunctionExpression(block: ts.Block, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
    return ts.createFunctionExpression([], null, undefined, [], parameter, undefined, block);
  }

  export function createFunctionExpressionReturn(descriptorToReturn: ts.Expression, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
    const block: ts.Block = ts.createBlock([ts.createReturn(descriptorToReturn)]);

    return ts.createFunctionExpression([], null, undefined, [], parameter, undefined, block);
  }

  export function createIIFE(block: ts.Block): ts.CallExpression {
    return ts.createCall(
      ts.createParen(ts.createFunctionExpression(
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        undefined,
        block,
      )),
      undefined,
      [],
    );
  }

  export function createEmptyProperty(): ts.PropertyDeclaration {
    return createProperty('', undefined);
  }

  export function createProperty(propertyName: string | PropertyName, type: ts.TypeNode): ts.PropertyDeclaration {
    return ts.createProperty([], [], propertyName, undefined, type, undefined);
  }

  export function createParameter(parameterName: string): ts.ParameterDeclaration {
    return ts.createParameter(
      undefined,
      undefined,
      undefined,
      ts.createIdentifier(parameterName),
      undefined,
      undefined,
      undefined,
    );
  }

  export function createMethod(methodName: string, body: ts.Block, parameterNames: ts.Identifier[] = []): ts.MethodDeclaration {
    const parameters: ts.ParameterDeclaration[] = parameterNames.map((parameterName: ts.Identifier) => ts.createParameter(
      undefined,
      undefined,
      undefined,
      parameterName,
      undefined,
      undefined,
      undefined,
    ));
    return ts.createMethod(
      undefined,
      undefined,
      undefined,
      ts.createIdentifier(methodName),
      undefined,
      undefined,
      parameters,
      undefined,
      body,
    );
  }

  export function createVariableDeclaration(variableIdentifier: ts.Identifier, initializer: ts.Expression): ts.VariableDeclaration {
    return ts.createVariableDeclaration(
      variableIdentifier,
      undefined,
      initializer,
    );
  }
}
