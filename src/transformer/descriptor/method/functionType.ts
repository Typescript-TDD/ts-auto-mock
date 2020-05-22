import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypescriptCreator } from '../../helper/creator';
import { PropertySignatureCache } from '../property/cache';
import { GetMethodDescriptor } from './method';

export function GetFunctionTypeDescriptor(node: ts.FunctionTypeNode | ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration, scope: Scope): ts.Expression {
  const property: ts.PropertyName = PropertySignatureCache.instance.get();

  if (!node.type) {
    throw new Error(`No type was declared for ${node.getText()}.`);
  }

  return GetMethodDescriptor(
    property,
    [
      TypescriptCreator.createMethodSignature(
        node.parameters.map((p: ts.ParameterDeclaration) => p.type),
        node.type,
      ),
    ],
    scope,
  );
}
