import { SignatureKind } from 'typescript';
import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetMockPropertiesFromDeclarations, GetMockPropertiesFromSymbol } from '../mock/mockProperties';

export function GetProperties(node: ts.Node, scope: Scope): ts.Expression {
    const typeChecker: ts.TypeChecker = TypeChecker();
    const type: ts.Type = typeChecker.getTypeAtLocation(node);
    const symbols: ts.Symbol[] = typeChecker.getPropertiesOfType(type);

    if (!symbols.length) {
        return GetPropertiesFromMembers(node as ts.TypeLiteralNode, scope);
    } else {
        const signatures: Array<ts.Signature> = [];

        Array.prototype.push.apply(signatures, typeChecker.getSignaturesOfType(type, SignatureKind.Call));
        Array.prototype.push.apply(signatures, typeChecker.getSignaturesOfType(type, SignatureKind.Construct));

        return GetMockPropertiesFromSymbol(symbols, signatures, scope);
    }
}

export function GetPropertiesFromMembers(node: ts.TypeLiteralNode, scope: Scope): ts.Expression {
    const members: ts.NodeArray<ts.NamedDeclaration> = node.members;
    const signatures: Array<ts.Declaration> = [];
    const properties: Array<ts.Declaration> = [];

    // tslint:disable-next-line
    for (let i: number = 0; i < members.length; i++) {
        if (members[i].kind === ts.SyntaxKind.CallSignature || members[i].kind === ts.SyntaxKind.ConstructSignature) {
            signatures.push(members[i]);
        } else if (members[i].kind === ts.SyntaxKind.PropertyDeclaration || members[i].kind === ts.SyntaxKind.PropertySignature || members[i].kind === ts.SyntaxKind.MethodSignature) {
            properties.push(members[i]);
        }
    }

    return GetMockPropertiesFromDeclarations(properties, signatures, scope);
}
