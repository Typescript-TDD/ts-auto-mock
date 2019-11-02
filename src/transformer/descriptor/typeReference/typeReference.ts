import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode, scope: IScope): ts.Expression {
    scope.addTypeReferenceCacheIfPresentForTypeReference(node);

    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    return GetDescriptor(declaration, scope);
}
