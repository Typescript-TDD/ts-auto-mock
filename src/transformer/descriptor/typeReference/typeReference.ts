import * as ts from 'typescript';
import { GetMockFactoryCall } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { isTypeReferenceReusable } from '../../typeReferenceReusable/typeReferenceReusable';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetTypescriptType, IsTypescriptType } from '../tsLibs/typecriptLibs';

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);

    if (IsTypescriptType(declaration)) {
        return GetDescriptor(GetTypescriptType(node, scope), scope);
    }

    if (isTypeReferenceReusable(declaration)) {
        return GetMockFactoryCall(node, scope);
    }

    return GetDescriptor(declaration, scope);
}
