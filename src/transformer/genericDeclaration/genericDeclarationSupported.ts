import * as ts from 'typescript';
import { InterfaceOrClassDeclaration } from '../scope/scope';

export type GenericDeclarationSupported = InterfaceOrClassDeclaration & ts.TypeAliasDeclaration;

export function extensionExpressionSupported(expression: ts.LeftHandSideExpression): expression is ts.Identifier {
  // This check is to prevent extends function() to die.
  // We don't have to support call expression in heritage extends because it will never have generics.
  // - You can only use extends with a function that return a constructor (new (...args: unknown[]) => unknown)
  // - You cannot pass generics to extends function
  // the test is in transformer/descriptor/extends/callExpression.test.ts
  return !ts.isCallExpression(expression);
}
