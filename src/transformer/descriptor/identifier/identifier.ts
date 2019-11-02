import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetIdentifierDescriptor(node: ts.Identifier, scope: IScope): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node);
    return GetDescriptor(declaration, scope);
    return GetDescriptor(declaration, scope);
}
