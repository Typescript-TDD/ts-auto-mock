import * as ts from 'typescript';
import { GetMockFactoryCall } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { isTypeReusable } from '../../typeValidator/typeValidator';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptorReusable(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    if (isTypeReusable(node, scope)) {
        return GetMockFactoryCall(node, scope);
    } else {
        const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
        return GetDescriptor(declaration, scope);
    }
}
