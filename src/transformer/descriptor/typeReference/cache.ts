import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';

export interface TypeReferenceCacheElement {
    type: ts.Type;
    descriptor: ts.Expression;
}

export class TypeReferenceCache {
    private _cache: TypeReferenceCacheElement[] = [];

    public addForTypeReference(node: ts.TypeReferenceNode, scope: IScope): void {
        const declarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.findParameterOfNode(node.typeName);

        this._addFromTypeArguments(node, declarationTypeParameters, scope);
    }

    public addForExpression(node: ts.ExpressionWithTypeArguments, scope: IScope): void {
        const declarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.findParameterOfNode(node.expression as ts.Identifier);

        this._addFromTypeArguments(node, declarationTypeParameters, scope);
    }

    public get(type: ts.Type): TypeReferenceCacheElement {
        return this._cache.find((element: TypeReferenceCacheElement) => {
            return element.type === type;
        });
    }

    private _addFromTypeArguments(
        node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments,
        declarations: ts.NodeArray<ts.TypeParameterDeclaration>,
        scope: IScope): void {
        node.typeArguments.forEach((typeArgument: ts.Node, index: number) => {
            const descriptor: ts.Expression = GetDescriptor(typeArgument, scope);
            const type: ts.Type = TypeChecker().getTypeAtLocation(declarations[index]);

            this._add(type, descriptor);
        });
    }

    private _add(type: ts.Type, descriptor: ts.Expression): void {
        const existingType: TypeReferenceCacheElement = this.get(type);

        if (existingType) {
            const indexToRemove: number = this._cache.indexOf(existingType);

            this._cache.splice(indexToRemove, 1);
        }

        this._cache.push({
            type, descriptor,
        });
    }
}
