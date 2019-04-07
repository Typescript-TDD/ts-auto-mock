import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetIdentifierDescriptor(node: ts.Identifier): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node);
    return GetDescriptor(declaration);
}
