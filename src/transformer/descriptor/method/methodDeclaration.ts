import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { GetFunctionReturnType } from './functionReturnType';
import { GetMethodDescriptor, MethodSignature } from './method';

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

  const methodSignatures: MethodSignature[] = methodDeclarations.map((declaration: ts.MethodDeclaration | ts.FunctionDeclaration) => ReshapeCallableDeclaration(declaration, scope));

  if (!node.name) {
    throw new Error(
      `The transformer couldn't determine the name of ${node.getText()}. Please report this incident.`,
    );
  }

  return GetMethodDescriptor(node.name, methodSignatures);
}

export function ReshapeCallableDeclaration(declaration: ts.SignatureDeclaration, scope: Scope): MethodSignature {
  const returnTypeNode: ts.Node = GetFunctionReturnType(declaration);

  return {
    parameters: declaration.parameters.map((parameter: ts.ParameterDeclaration) => parameter),
    returnValue: GetDescriptor(returnTypeNode, scope),
  };
}
