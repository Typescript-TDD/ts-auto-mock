import * as ts from 'typescript';
import { GetMockFactoryCall } from '../../mockFactoryCall/mockFactoryCall';
import { IScope } from '../../scope/scope.interface';
import { isTypeReusable } from '../../typeValidator/typeValidator';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptorReusable(node: ts.TypeReferenceNode, scope: IScope): ts.Expression {
    scope.addTypeReferenceCacheIfPresentForTypeReference(node);

    if (isTypeReusable(node, scope)) {
        return GetMockFactoryCall(node);
    } else {
        const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
        return GetDescriptor(declaration, scope);
    }
}
