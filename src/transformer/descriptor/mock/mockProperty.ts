import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMockDeclarationName, GetMockSetParameterName } from './mockDeclarationName';

export function GetMockProperty(member: ts.PropertyDeclaration): Array<ts.GetAccessorDeclaration | ts.SetAccessorDeclaration> {
    const descriptor: ts.Expression = GetDescriptor(member);

    const propertyName: ts.Identifier = member.name as ts.Identifier;
    const variableDeclarationName: ts.Identifier = GetMockDeclarationName(propertyName);
    const setVariableParameterName: ts.Identifier = GetMockSetParameterName(propertyName);

    const expressionGetAssignment: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, descriptor);

    const getExpressionBody: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.BarBarToken, expressionGetAssignment);
    const setExpressionBody: ts.BinaryExpression = ts.createBinary(variableDeclarationName, ts.SyntaxKind.EqualsToken, setVariableParameterName);

    const returnGetStatement: ts.ReturnStatement = ts.createReturn(getExpressionBody);
    const getBody: ts.Block = ts.createBlock([returnGetStatement]);

    const returnSetStatement: ts.Statement = ts.createExpressionStatement(setExpressionBody);
    const setBody: ts.Block = ts.createBlock([returnSetStatement]);

    const getAccessor: ts.GetAccessorDeclaration = TypescriptHelper.createGetAccessor(propertyName, getBody);
    const setAccessor: ts.SetAccessorDeclaration = TypescriptHelper.createSetAccessor(propertyName, setBody, setVariableParameterName);
    return [getAccessor, setAccessor];
}
