import type * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TransformerLogger } from '../../logger/transformerLogger';
import { GetNullDescriptor } from '../null/null';
import { PropertySignatureCache } from './cache';

type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(
  node: PropertyNode,
  scope: Scope
): ts.Expression {
  PropertySignatureCache.instance.set(node.name);

  if (node.type) {
    return GetDescriptor(node.type, scope);
  }

  if (!node.initializer) {
    TransformerLogger().typeOfPropertyNotFound(node);
    return GetNullDescriptor();
  }

  return GetDescriptor(node.initializer, scope);
}
