import * as ts from 'typescript';
import { GetMockFactoryCall } from '../../mockFactoryCall/mockFactoryCall';
import { isTypeReusable } from '../../typeValidator/typeValidator';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { TypeReferenceCache } from './cache';

export function GetTypeReferenceDescriptorReusable(node: ts.TypeReferenceNode): ts.Expression {
    TypeReferenceCache.instance.addIfPresentForTypeReference(node);

    if (isTypeReusable(node)) {
        return GetMockFactoryCall(node);
    } else {
        const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
        return GetDescriptor(declaration);
    }
}
