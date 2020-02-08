import { FunctionLikeDeclaration } from 'typescript';
import * as ts from 'typescript';
import { TransformerLogger } from '../../logger/transformerLogger';
import { NodeToString } from '../../printNode';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetFunctionReturnType } from '../method/functionReturnType';
import { GetNullDescriptor } from '../null/null';

export function GetCallExpressionDescriptor(node: ts.CallExpression, scope: Scope): ts.Expression {
  return GetDescriptor(GetCallExpressionType(node), scope);
}

export function GetCallExpressionType(node: ts.CallExpression): ts.Node {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.expression);

  return GetFinalFunctionTypeFromDeclaration(node, declaration);
}

function GetFinalFunctionTypeFromDeclaration(initialNode: ts.Node, node: ts.Node): ts.Node {
  if (ts.isFunctionLike(node)) {
    return GetFunctionReturnType(node as FunctionLikeDeclaration);
  } else if (ts.isVariableDeclaration(node)) {
    if (node.type) {
      if (ts.isFunctionTypeNode(node.type)) {
        return node.type.type;
      }
    } else if (node.initializer) {
      return GetFinalFunctionTypeFromDeclaration(initialNode, node.initializer);
    }
  }

  TransformerLogger().typeOfFunctionCallNotFound(NodeToString(initialNode));
  return GetNullDescriptor();
}
