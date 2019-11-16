import { SignatureKind } from 'typescript';
import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetProperties(node: ts.Node, scope: Scope): ts.Expression {
    if (ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node)) {
       scope.declarationNode = node;
    }

    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);
    const symbols: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    const signatures: ReadonlyArray<ts.Signature> = typeChecker.getSignaturesOfType(type, SignatureKind.Call);

    return GetMockPropertiesFromSymbol(symbols, signatures, scope);
}
