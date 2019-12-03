import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export function GetConstructorTypeDescriptor(node: ts.ConstructorTypeNode, scope: Scope): ts.Expression {
  return TypescriptCreator.createFunctionExpressionReturn(GetDescriptor(node.type, scope));
}
