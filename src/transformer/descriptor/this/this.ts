import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetThisDescriptor(node: ts.ThisTypeNode): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node);
    return GetDescriptor(declaration);
}
