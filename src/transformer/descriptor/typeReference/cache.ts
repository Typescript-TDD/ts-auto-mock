import * as ts from 'typescript';
import { TypescriptHelper } from "../helper/helper";
import { GetDescriptor } from "../descriptor";
import { TypeChecker } from "../../typeChecker/typeChecker";

interface TypeReferenceCacheElement {
    type: ts.Type,
    descriptor: ts.Expression
}

export class TypeReferenceCache {
    private static _instance: TypeReferenceCache;
    private _cache: Array<TypeReferenceCacheElement>;

    public static get instance(): TypeReferenceCache {
        this._instance = this._instance || new TypeReferenceCache();
        return this._instance;
    }

    public clear(): void {
        this._cache = [];
    }

    private _addFromTypeArguments(node: ts.TypeReferenceNode  | ts.ExpressionWithTypeArguments, declarations: ts.NodeArray<ts.TypeParameterDeclaration>) {
        node.typeArguments.forEach((typeArgument, index: number) => {
            const descriptor = GetDescriptor(typeArgument);
            const type = TypeChecker().getTypeAtLocation(declarations[index]);

            this._add(type, descriptor);
        });
    }

    public addIfPresentForTypeReference(node: ts.TypeReferenceNode) {
        if (node.typeArguments) {
            const declarationTypeParameters = TypescriptHelper.findParameterOfNode(node.typeName);

            this._addFromTypeArguments(node, declarationTypeParameters);            
        }
    }

    public addIfPresentForExpression(node: ts.ExpressionWithTypeArguments) {
        if (node.typeArguments) {
            const declarationTypeParameters = TypescriptHelper.findParameterOfNode(node.expression as ts.Identifier);

            this._addFromTypeArguments(node, declarationTypeParameters);
        }
    }

    public get(type: ts.Type): TypeReferenceCacheElement {
        return this._cache.find((element) => {
            return element.type === type;
        })
    }

    private _add(type: ts.Type, descriptor: ts.Expression): void {
        const existingType = this.get(type);

        if (existingType) {
            const indexToRemove = this._cache.indexOf(existingType);

            this._cache.splice(indexToRemove, 1)
        }

        this._cache.push({
            type, descriptor
        });
    }
}