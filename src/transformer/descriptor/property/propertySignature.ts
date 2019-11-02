import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';
import { GetUndefinedDescriptor } from '../undefined/undefined';
import { PropertySignatureCache } from './cache';

type PropertyNode = ts.PropertySignature | ts.PropertyDeclaration;

export function GetPropertyDescriptor(node: PropertyNode, scope: IScope): ts.Expression {
    PropertySignatureCache.instance.set(node.name);

    if (node.type) {
        if (node.questionToken) {
            return GetUndefinedDescriptor();
        }
        return GetDescriptor(node.type, scope);
    }

    return GetDescriptor(node.initializer, scope);
}
