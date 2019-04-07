import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { PropertySignatureCache } from './cache';

type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode): ts.Expression {
    PropertySignatureCache.instance.set(node.name);

    if (node.type) {
        if (node.questionToken) {
            return GetUndefinedDescriptor();
        }
        return GetDescriptor(node.type);
    }

    return GetDescriptor(node.initializer);
}
