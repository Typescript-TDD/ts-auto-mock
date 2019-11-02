import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';

export function GetTypeAliasDescriptor(node: ts.TypeAliasDeclaration, scope: IScope): ts.Expression {
    return GetDescriptor(node.type, scope);
}
