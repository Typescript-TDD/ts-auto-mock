import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { MockGenericParameter } from '../mockGeneric/mockGenericParameter';
import { CacheTest, Scope } from '../scope/scope';
import { TypeChecker } from '../typeChecker/typeChecker';

export function GetMockFactoryCall(node: ts.Node, scope: Scope): ts.Expression {
    const currentCache: ts.FunctionExpression[] = [];
    const mockFactoryCall: ts.Expression = MockDefiner.instance.getMockFactory(node as ts.TypeReferenceNode);

    console.log('lets do it');
    if (ts.isTypeReferenceNode(node) && node.typeArguments) {
        const parameters: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.findParameterOfNode(node.typeName);

        node.typeArguments.forEach((argument: ts.TypeNode, index: number) => {
            let descriptor: ts.Expression;

            const type1: ts.Type = TypeChecker().getTypeAtLocation(parameters[index]);

            const typeNode: ts.Type = TypeChecker().getTypeFromTypeNode(argument);


            if (!scope.checkTest(typeNode)) {
                descriptor = GetDescriptor(argument, scope);

                scope.addTest(type1, descriptor);
            } else {
                const existing: CacheTest =  scope.getTest(typeNode);
                const declr: ts.Declaration = typeNode.symbol.declarations[0];
                const test: ts.Declaration = ts.getTypeParameterOwner(declr);

                const element: number = (test as ts.InterfaceDeclaration).typeParameters.findIndex((tp: ts.TypeParameterDeclaration) => {
                    return tp.name === (declr as ts.TypeParameterDeclaration).name;
                });

                descriptor = ts.createElementAccess(
                    MockGenericParameter,
                    ts.createNumericLiteral(element.toString())
                );
                scope.addTest(type1, existing.descriptor);
            }

            currentCache.push(ts.createFunctionExpression(undefined, undefined, undefined, undefined, [], undefined,
                ts.createBlock(
                    [ts.createReturn(descriptor)],
                ),
            ));
        });
    }

    return ts.createCall(
        mockFactoryCall,
        [],
        [ts.createArrayLiteral(currentCache)],
    );
}
