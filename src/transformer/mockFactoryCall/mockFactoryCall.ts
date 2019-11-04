import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { Scope } from '../scope/scope';

export function GetMockFactoryCall(node: ts.Node, scope: Scope): ts.Expression {
    const genericsFunctions: ts.FunctionExpression[] = [];
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(node as ts.TypeReferenceNode);

    if (ts.isTypeReferenceNode(node) && node.typeArguments) {
        node.typeArguments.forEach((argument: ts.TypeNode) => {
            let genericDescriptor: ts.Expression;

            genericDescriptor = GetDescriptor(argument, scope);

            const genericFunction: ts.FunctionExpression = TypescriptHelper.createFunctionExpression(ts.createBlock(
                [ts.createReturn(genericDescriptor)],
            ));

            genericsFunctions.push(genericFunction);
        });
    }

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(genericsFunctions)],
    );
}
