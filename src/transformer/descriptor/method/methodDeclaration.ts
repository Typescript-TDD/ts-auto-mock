import * as ts from 'typescript';
import { MethodSignature, TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetReturnNodeFromBody } from './bodyReturnType';
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

  const methodSignatures: MethodSignature[] = methodDeclarations.map((signature: ts.MethodDeclaration | ts.FunctionDeclaration) => {
    let signatureType: ts.TypeNode | undefined = signature.type;

    if (!signatureType) {
      signatureType = ts.createLiteralTypeNode(GetReturnNodeFromBody(signature) as ts.LiteralExpression);
    }

    return TypescriptCreator.createMethodSignature(
      signature.parameters.map((p: ts.ParameterDeclaration) => p.type),
      signatureType,
    );
  });

  if (!node.name) {
    throw new Error(
      `The transformer couldn't determine the name of ${node.getText()}. Please report this incident.`,
    );
  }

  return GetMethodDescriptor(node.name, methodSignatures, scope);
}
