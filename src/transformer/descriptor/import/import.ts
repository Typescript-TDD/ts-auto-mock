import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';
import { GetTypeImport, ImportNode } from '../type/typeImport';

export function GetImportDescriptor(node: ImportNode, scope: IScope): ts.Expression {
    const type: ts.Node = GetTypeImport(node);
    return GetDescriptor(type, scope);
}
