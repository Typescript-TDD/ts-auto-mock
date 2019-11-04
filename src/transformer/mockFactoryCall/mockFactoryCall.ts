import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Scope } from '../scope/scope';

export function GetMockFactoryCall(node: ts.Node, scope: Scope): ts.Expression {
    const genericsFunctions: ts.FunctionExpression[] = [];
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(node as ts.TypeReferenceNode);

    if (ts.isTypeReferenceNode(node) && node.typeArguments) {

        node.typeArguments.forEach((argument: ts.TypeNode) => {
            let genericDescriptor: ts.Expression;

            genericDescriptor = GetDescriptor(argument, scope);

            genericsFunctions.push(ts.createFunctionExpression(undefined, undefined, undefined, undefined, [], undefined,
                ts.createBlock(
                    [ts.createReturn(genericDescriptor)],
                ),
            ));
        });
    }

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(genericsFunctions)],
    );
}
