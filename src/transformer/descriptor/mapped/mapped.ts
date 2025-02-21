import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { core } from '../../core/core';
import { GetMockPropertiesFromDeclarations } from '../mock/mockProperties';
import { GetTypes } from '../type/type';
import {
  createNodeArray,
  createProperty,
} from '../../../typescriptFactory/typescriptFactory';

export function GetMappedDescriptor(
  node: ts.MappedTypeNode,
  scope: Scope,
): ts.Expression {
  const typeParameter: ts.TypeNode | undefined = node.typeParameter.constraint;

  const parameters: ts.TypeNode[] = [];
  if (typeParameter) {
    parameters.push(typeParameter);
  }

  const types: ts.Node[] = GetTypes(createNodeArray(parameters), scope);

  const properties: ts.PropertyDeclaration[] = types.reduce(
    (acc: ts.PropertyDeclaration[], possibleType: ts.Node) => {
      if (core.ts.isLiteralTypeNode(possibleType)) {
        const property: ts.PropertyDeclaration = createProperty(
          (possibleType.literal as ts.StringLiteral).text,
          node.type,
        );
        acc.push(property);
        return acc;
      }

      const type: ts.Type = core.typeChecker.getTypeAtLocation(possibleType);
      const propertiesDeclaration: ts.PropertyDeclaration[] = core.typeChecker
        .getPropertiesOfType(type)
        .map((symbol: ts.Symbol) => createProperty(symbol.name, node.type));

      acc = acc.concat(propertiesDeclaration);

      return acc;
    },
    [],
  );

  return GetMockPropertiesFromDeclarations(properties, [], scope);
}
