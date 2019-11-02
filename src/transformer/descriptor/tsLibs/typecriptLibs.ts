import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypescriptLibsTypeAdapter } from './typescriptLibsTypeAdapter';
import { TypescriptLibsTypesFolder } from './typescriptLibsTypes';

export function IsTypescriptType(node: ts.Node): boolean {
    const nodeFile: ts.SourceFile = node.getSourceFile();

    if (nodeFile) {
        const fileName: string = nodeFile.fileName;
        return fileName.includes(TypescriptLibsTypesFolder);
    }

    return false;
}

export function GetTypescriptType(node: ts.Node, scope: IScope): ts.Node {
    return TypescriptLibsTypeAdapter(node, scope);
}
