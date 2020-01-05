import * as ts from 'typescript';

export type PropertyLike = ts.PropertyDeclaration | ts.PropertySignature | ts.MethodSignature;

export function isPropertyLike(prop: ts.Node): prop is PropertyLike {
    return prop.kind === ts.SyntaxKind.PropertyDeclaration || prop.kind === ts.SyntaxKind.PropertySignature || prop.kind === ts.SyntaxKind.MethodSignature;
}
