import * as ts from 'typescript';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import { ModuleName } from '../mockDefiner/modules/moduleName';

function mergePropertyAccessor(methodName: string): ts.PropertyAccessExpression {
    return ts.createPropertyAccess(
        ts.createPropertyAccess(
            MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Merge),
            ts.createIdentifier('ɵMerge'),
        ),
        ts.createIdentifier(methodName),
    );
}

export function getMockMergeExpression(nodeMocked: ts.Expression, defaultValues: ts.Expression): ts.Expression {
    return ts.createCall(
        mergePropertyAccessor('merge'),
        [],
        [
            nodeMocked,
            defaultValues,
        ],
    );
}

export function getMockMergeIteratorExpression(nodeMocked: ts.Expression, defaultValuesFunction: ts.Expression, index: ts.NumericLiteral): ts.Expression {
    return ts.createCall(
        mergePropertyAccessor('mergeIterator'),
        [],
        [
            nodeMocked,
            defaultValuesFunction,
            index,
        ],
    );
}
