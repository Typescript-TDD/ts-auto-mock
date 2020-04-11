import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { PropertySignatureCache } from './cache';

type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode, scope: Scope): ts.Expression {
  PropertySignatureCache.instance.set(node.name);

  if (node.type) {
    if (node.questionToken) {
      return GetUndefinedDescriptor();
    }

    return GetDescriptor(node.type, scope);
  }

  if (!node.initializer) {
    throw new Error('Unhandled');
  }

  return GetDescriptor(node.initializer, scope);
}
