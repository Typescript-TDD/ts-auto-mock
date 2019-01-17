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

    public addIfPresent(node: ts.TypeReferenceNode) {
        if (node.typeArguments) {
            const declarationTypeParameters = TypescriptHelper.findParameterOfNode(node.typeName);

            node.typeArguments.forEach((typeArgument, index: number) => {
                const type = TypeChecker().getTypeAtLocation(declarationTypeParameters[index]);

                this._add(type, GetDescriptor(typeArgument));
            });
        }
    }

    public get(type: ts.Type): TypeReferenceCacheElement {
        return this._cache.find((element) => {
            return element.type === type;
        })
    }

    private _add(type: ts.Type, descriptor: ts.Expression): void {
        this._cache.push({
            type, descriptor
        });
    }
}