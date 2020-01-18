import * as ts from 'typescript';
import { GenericDeclarationSupported } from './genericDeclarationSupported';

export interface IGenericDeclaration {
  addFromTypeReferenceNode(node: ts.TypeReferenceNode, declarationKey: string): void;
  addFromDeclarationExtension(declarationKey: string,
    extensionDeclaration: GenericDeclarationSupported,
    extensionDeclarationKey: string,
    extension: ts.ExpressionWithTypeArguments): void;
  getExpressionForAllGenerics(): ts.ObjectLiteralExpression[];
}
