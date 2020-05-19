import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypescriptCreator } from '../../helper/creator';
import { GetMethodDescriptor } from './method';

export function GetMethodSignatureDescriptor(node: ts.MethodSignature, scope: Scope): ts.Expression {
  return GetMethodDescriptor(
    node.name,
    [
      TypescriptCreator.createMethodSignature(
        node.parameters.map((p: ts.ParameterDeclaration) => p.type),
        node.type,
      ),
    ],
    scope,
  );
}
