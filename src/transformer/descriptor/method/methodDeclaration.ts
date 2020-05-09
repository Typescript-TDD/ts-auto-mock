import ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';

import { GetMethodDescriptor } from './method';

export function GetMethodDeclarationDescriptor(node: ts.MethodDeclaration | ts.FunctionDeclaration, scope: Scope): ts.Expression {
  const declarationType: ts.Type | undefined = TypeChecker().getTypeAtLocation(node);
  const methodDeclarations: Array<ts.MethodDeclaration | ts.FunctionDeclaration> = declarationType.symbol.declarations
    .filter(
      (declaration: ts.Declaration): declaration is ts.MethodDeclaration | ts.FunctionDeclaration =>
        ts.isMethodDeclaration(declaration) || ts.isFunctionDeclaration(declaration)
    );

  if (!methodDeclarations.length) {
    methodDeclarations.push(node);
  }

  if (!node.name) {
    throw new Error(
      `The transformer couldn't determine the name of ${node.getText()}. Please report this incident.`,
    );
  }

  return GetMethodDescriptor(node.name, methodDeclarations, scope);
}
