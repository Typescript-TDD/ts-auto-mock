import * as ts from 'typescript';
import { GetMockFactoryCallIntersection } from '../../mockFactoryCall/mockFactoryCall';
import { Scope } from '../../scope/scope';
import { TypescriptHelper } from '../helper/helper';
import { GetTypes } from '../type/type';
import { GetUndefinedDescriptor } from '../undefined/undefined';

export function GetIntersectionDescriptor(intersectionTypeNode: ts.IntersectionTypeNode, scope: Scope): ts.Expression {
    const nodes: ts.Node[] = GetTypes(intersectionTypeNode.types, scope);

    const hasInvalidIntersections: boolean = nodes.some((node: ts.Node) => {
        return TypescriptHelper.IsLiteralOrPrimitive(node);
    });

    if (hasInvalidIntersections) {
        return GetUndefinedDescriptor();
    }

    return GetMockFactoryCallIntersection(intersectionTypeNode, scope);
}
