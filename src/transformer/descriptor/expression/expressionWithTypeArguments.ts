import * as ts from 'typescript';
import { IScope } from '../../scope/scope.interface';
import { GetDescriptor } from '../descriptor';

export function GetExpressionWithTypeArgumentsDescriptor(node: ts.ExpressionWithTypeArguments, scope: IScope): ts.Expression {
    return GetDescriptor(node.expression, scope);
}
