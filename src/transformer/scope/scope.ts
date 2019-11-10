import * as ts from 'typescript';

export type InterfaceOrClassDeclaration = ts.InterfaceDeclaration | ts.ClassDeclaration;
export class Scope {
    private _declarationNode: InterfaceOrClassDeclaration;

    set declarationNode(node: InterfaceOrClassDeclaration) {
        this._declarationNode = node;
    }

    get declarationNode(): InterfaceOrClassDeclaration {
        return this._declarationNode;
    }
}
