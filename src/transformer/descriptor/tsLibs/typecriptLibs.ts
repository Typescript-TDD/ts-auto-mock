import * as ts from 'typescript';
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

export function GetTypescriptType(node: ts.Node): ts.Node {
    return TypescriptLibsTypeAdapter(node);
}
