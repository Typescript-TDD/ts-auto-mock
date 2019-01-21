import * as ts from 'typescript';
import { TypescriptLibsTypesFolder } from "./typescriptLibsTypes";
import { TypescriptLibsTypeAdapter } from "./typescriptLibsTypeAdapter";

export function IsTypescriptType(node: ts.Node): boolean {
    const nodeFile = node.getSourceFile();

    if (nodeFile) {
        const fileName = nodeFile.fileName;
        return fileName.includes(TypescriptLibsTypesFolder);
    }

    return false;
}

export function GetTypescriptType(node: ts.Node): ts.Node {
    return TypescriptLibsTypeAdapter(node);
}