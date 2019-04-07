import * as ts from 'typescript';
import { MockDefiner } from '../mockDefiner/mockDefiner';

export function GetMockFactoryCall(node: ts.Node): ts.Expression {
    return ts.createCall(
        MockDefiner.instance.getMockFactory(node as ts.TypeReferenceNode),
        [],
        [],
    );
}
