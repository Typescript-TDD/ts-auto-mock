import * as ts from 'typescript';

export class Scope {
    private _declarationNode: ts.Node;

    set declarationNode(node: ts.Node) {
        this._declarationNode = node;
    }

    get declarationNode(): ts.Node {
        return this._declarationNode;
    }
}
