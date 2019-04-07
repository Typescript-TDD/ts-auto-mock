import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetTypeImport, ImportNode } from '../type/typeImport';

export function GetImportDescriptor(node: ImportNode): ts.Expression {
    const type: ts.Node = GetTypeImport(node);
    return GetDescriptor(type);
}
