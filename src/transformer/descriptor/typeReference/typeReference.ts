import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import {
  CreateMockFactory,
  GetMockFactoryCall,
} from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { isTypeReferenceReusable } from '../../typeReferenceReusable/typeReferenceReusable';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import {
  GetTypescriptTypeDescriptor,
  IsTypescriptType,
} from '../tsLibs/typecriptLibs';

export function GetTypeReferenceDescriptor(
  node: ts.TypeReferenceNode,
  scope: Scope
): ts.Expression {
  const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(
    node.typeName
  );

  if (MockDefiner.instance.hasMockForDeclaration(declaration)) {
    return GetMockFactoryCall(node, declaration, scope);
  }

  if (IsTypescriptType(declaration)) {
    return GetTypescriptTypeDescriptor(node, scope);
  }

  if (isTypeReferenceReusable(declaration)) {
    return CreateMockFactory(node, declaration, scope);
  }

  return GetDescriptor(declaration, scope);
}
