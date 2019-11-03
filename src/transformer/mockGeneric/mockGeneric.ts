import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { Scope } from '../scope/scope';
import { TypeChecker } from '../typeChecker/typeChecker';

export interface MockGenericCache {
    descriptor: ts.Expression;
    identifier: ts.Identifier;
    type: ts.TypeParameter;
}

export class MockGeneric {
    private _cache: MockGenericCache[] = [];

    public addGeneric(node: ts.TypeReferenceNode, scope: Scope): void {
        const typeArguments: ts.NodeArray<ts.TypeNode> = node.typeArguments;
        const parameters: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.findParameterOfNode(node.typeName);

        typeArguments.forEach((argument: ts.TypeNode, index: number) => {
            const descriptor: ts.Expression = GetDescriptor(argument, scope);

            const type: ts.Type = TypeChecker().getTypeAtLocation(parameters[index]);

            this._add(descriptor, parameters[index].name, type);
        });
    }

    private _add(descriptor: ts.Expression, identifier: ts.Identifier, type: ts.Type): void {
        this._cache.push({
            descriptor,
            identifier,
            type,
        });
    }

    public getAll(): ts.ObjectLiteralExpression {
        const bla: ts.PropertyAssignment[] = this._cache.map((element: MockGenericCache) => {
            const functionsWithGenericValueReturn: ts.FunctionExpression = ts.createFunctionExpression(
                undefined,
                undefined,
                undefined,
                undefined,
                [],
                undefined,
                ts.createBlock(
                    [ts.createReturn(element.descriptor)],
                    true,
                ),
            );

            return ts.createPropertyAssignment(
                ts.createIdentifier(element.type.symbol.escapedName + ''),
                functionsWithGenericValueReturn,
            );

        });

        return ts.createObjectLiteral(
            bla,
            true,
        );
    }

    public has(type: ts.TypeParameter): boolean {
        return !!this._cache.find((element: MockGenericCache) => {
            return element.type === type;
        });
    }

    public isEmpty(): boolean {
        return this._cache.length === 0;
    }

    public emptyGeneric(): void {
        this._cache.length = 0;
    }
}
