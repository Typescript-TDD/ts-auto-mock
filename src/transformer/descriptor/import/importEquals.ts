import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export function GetImportEqualsDescriptor(node: ts.ImportEqualsDeclaration, scope: Scope): ts.Expression {
    const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(node.moduleReference);
    return GetDescriptor(declaration, scope);
}
