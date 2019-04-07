import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { TypeReferenceCache } from './cache';

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode): ts.Expression {
    TypeReferenceCache.instance.addIfPresentForTypeReference(node);

    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    return GetDescriptor(declaration);
}
