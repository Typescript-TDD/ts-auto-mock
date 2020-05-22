import { PropertyName, VariableDeclaration, VariableStatement } from 'typescript';
import * as ts from 'typescript';
import { IsTypescriptType } from '../descriptor/tsLibs/typecriptLibs';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { NodeToString } from '../printNode';

export interface MethodSignature extends ts.MethodSignature {
  parameters: ts.NodeArray<ParameterDeclaration>;
  type: ts.TypeNode;
}

export interface ParameterDeclaration extends ts.ParameterDeclaration {
  type: ts.TypeNode;
}

export namespace TypescriptCreator {
  export function createArrowFunction(block: ts.ConciseBody, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.ArrowFunction {
    return ts.createArrowFunction(undefined, undefined, parameter, undefined, ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken), block);
  }

  export function createFunctionExpression(block: ts.Block, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
    return ts.createFunctionExpression(undefined, undefined, undefined, undefined, parameter, undefined, block);
  }

  export function createFunctionExpressionReturn(descriptorToReturn: ts.Expression, parameter: ReadonlyArray<ts.ParameterDeclaration> = []): ts.FunctionExpression {
    const block: ts.Block = ts.createBlock([ts.createReturn(descriptorToReturn)]);

    return ts.createFunctionExpression(undefined, undefined, undefined, undefined, parameter, undefined, block);
  }

  export function createCall(expression: ts.Expression, argumentExpressions: ts.Expression[]): ts.CallExpression {
    return ts.createCall(
      expression,
      undefined,
      argumentExpressions,
    );
  }

  export function createVariableStatement(declarations: VariableDeclaration[]): VariableStatement {
    return ts.createVariableStatement(undefined, declarations);
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

  export function createProperty(propertyName: string | PropertyName, type: ts.TypeNode | undefined): ts.PropertyDeclaration {
    return ts.createProperty(undefined, undefined, propertyName, undefined, type, undefined);
  }

  export function createPropertySignature(propertyName: string | PropertyName, type: ts.TypeNode): ts.PropertySignature {
    return ts.createPropertySignature([], propertyName, undefined, type, undefined);
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

  function serialize(node: ts.TypeNode): string {
    if (TypescriptHelper.IsLiteralOrPrimitive(node) || ts.isTypeReferenceNode(node)) {
      return NodeToString(node);
    }

    if (ts.isTypeLiteralNode(node)) {
      const serialized: string = node.members
        .filter((member: ts.TypeElement): member is ts.PropertySignature => ts.isPropertySignature(member))
        .map((member: ts.PropertySignature) => member.type ? serialize(member.type) : '').join('|');
      return `{${serialized}}`;
    }

    if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
      const serialized: string = node.types.map((member: ts.TypeNode) => serialize(member)).join('|');
      return `[${serialized}]`;
    }

    return '';
  }

  export function createSignatureHash(signature: ts.SignatureDeclaration | ts.SignatureDeclaration[]): string {
    function serializeSignature(s: ts.SignatureDeclaration): string {
      const parameters: ts.NodeArray<ts.ParameterDeclaration> = s.parameters;

      const signatureParts: string[] = [];

      if (parameters.length) {
        signatureParts.push(
          ...parameters.map(<T extends { type?: ts.TypeNode }>(p: T) => {
            const type: ts.TypeNode | undefined = p.type;

            if (!type) {
              return '';
            }

            if (ts.isFunctionLike(type)) {
              return `(${serializeSignature(type)})`;
            }

            return serialize(type);
          })
        );
      }

      const signatureType: ts.TypeNode | undefined = s.type;

      if (signatureType) {
        signatureParts.push(serialize(signatureType));
      }

      return signatureParts.join('|');
    }

    const signatures: ts.SignatureDeclaration[] = Array.isArray(signature) ? signature : [signature];

    // TODO: Check debug option and emit a verbose string representation

    // TODO: Make sure this doesn't result in collisions
    return Buffer.from(
      [
        Array.from(signatures.map((s: ts.SignatureDeclaration) => serializeSignature(s)).join('|'))
          .reduce((s: number, c: string) => {
            // eslint-disable-next-line
            const charCode: number = c.charCodeAt(0) | 0;

            return Math.imul(31, s) + charCode;
          }, 0),
      ],
    ).toString('base64');
  }

  function isDefinitiveMethodSignature(signature: ts.MethodSignature): signature is MethodSignature {
    return !!signature.type;
  }

  function isDefinitiveParameterDeclaration(parameter: ts.ParameterDeclaration): parameter is ParameterDeclaration {
    return !!parameter.type;
  }

  export function createMethodSignature(parameterTypes: Array<ts.TypeNode | undefined> = [], returnType: ts.TypeNode | undefined): MethodSignature {
    const parameters: ParameterDeclaration[] = parameterTypes
      .filter((type: ts.TypeNode | undefined): type is ts.TypeNode => !!type)
      .map((parameterType: ts.TypeNode, i: number) => {
        // TODO: Merge/move this block with/to typescriptLibs.ts
        if (ts.isTypeReferenceNode(parameterType)) {
          const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(parameterType.typeName);
          if (IsTypescriptType(declaration)) {
            parameterType = ts.createFunctionTypeNode(undefined, [], ts.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword));
          }
        }

        const parameter: ts.ParameterDeclaration = ts.createParameter(
          undefined,
          undefined,
          undefined,
          `__${i++}`,
          undefined,
          parameterType,
          undefined,
        );

        if (!isDefinitiveParameterDeclaration(parameter)) {
          throw new Error();
        }

        return parameter;
      });

    const signature: ts.MethodSignature = ts.createMethodSignature(
      undefined,
      parameters,
      returnType || ts.createKeywordTypeNode(ts.SyntaxKind.NullKeyword),
      '',
      undefined,
    );

    if (!isDefinitiveMethodSignature(signature)) {
      throw new Error();
    }

    return signature;
  }

  export function createVariableDeclaration(variableIdentifier: ts.Identifier, initializer: ts.Expression): ts.VariableDeclaration {
    return ts.createVariableDeclaration(
      variableIdentifier,
      undefined,
      initializer,
    );
  }
}
