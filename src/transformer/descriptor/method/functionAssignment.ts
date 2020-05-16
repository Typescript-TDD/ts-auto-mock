import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypescriptCreator } from '../../helper/creator';
import { PropertySignatureCache } from '../property/cache';
import { GetReturnNodeFromBody } from './bodyReturnType';
import { GetMethodDescriptor } from './method';

type functionAssignment = ts.ArrowFunction | ts.FunctionExpression;

export function GetFunctionAssignmentDescriptor(node: functionAssignment, scope: Scope): ts.Expression {
  const property: ts.PropertyName = PropertySignatureCache.instance.get();
  const returnValue: ts.Expression = GetReturnNodeFromBody(node);

  const returnType: ts.TypeNode = ts.createLiteralTypeNode(returnValue as ts.LiteralExpression);

  return GetMethodDescriptor(
    property,
    [
      TypescriptCreator.createMethodSignature(
        undefined,
        returnType,
      ),
    ],
    scope,
  );
}
