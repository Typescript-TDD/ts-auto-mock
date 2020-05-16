import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptCreator } from '../../helper/creator';
import { GetNullDescriptor } from '../null/null';
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
