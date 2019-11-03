import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetTypeReferenceDescriptor(node: ts.TypeReferenceNode, scope: Scope): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.typeName);
    return GetDescriptor(declaration, scope);
}
