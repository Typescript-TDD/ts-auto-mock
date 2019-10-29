import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetMockMarkerProperty, Property } from './mockMarker';

export function GetMockCall(
    declarations: ts.VariableDeclaration[],
    properties: ts.AccessorDeclaration[],
    signatures: ReadonlyArray<ts.Signature>): ts.CallExpression {
    const uniqueVariable: ts.Identifier = CreateUniqueTsAutoMockVariable();
    const listOfVariables: ts.VariableStatement = GetListOfVariables(declarations, uniqueVariable);
    const mockMarkerAssignedToUniqueVariable: ts.ExpressionStatement = GetMockMarkerPropertyAssignedTo(uniqueVariable);
    const uniqueVariableAssignmentToProperties: ts.ExpressionStatement = assignPropertiesToUniqueVariable(uniqueVariable, properties);
    const uniqueVariableAssignmentToObjectAssign: ts.ExpressionStatement = assignObjectSignatureToUniqueVariable(uniqueVariable, signatures);
    const returnStatement: ts.ReturnStatement = ts.createReturn(uniqueVariable);
    const statements: Array<ts.VariableStatement | ts.ExpressionStatement | ts.ReturnStatement> = [
        listOfVariables,
        mockMarkerAssignedToUniqueVariable,
        uniqueVariableAssignmentToProperties,
        uniqueVariableAssignmentToObjectAssign,
        returnStatement,
    ];

    const arrowFunctionBlock: ts.Block = ts.createBlock(statements);
    const arrowFunction: ts.ArrowFunction = TypescriptHelper.createArrowFunction(arrowFunctionBlock);
    const IFFEFunction: ts.ParenthesizedExpression = ts.createParen(arrowFunction);
    return ts.createCall(IFFEFunction, [], []);
}

function GetListOfVariables(declarations: ts.VariableDeclaration[], identifierUniqueNameVariable: ts.Identifier): ts.VariableStatement {
    const variableDeclarationUnique: ts.VariableDeclaration = ts.createVariableDeclaration(identifierUniqueNameVariable, undefined, ts.createObjectLiteral());
    const variables: ts.VariableDeclaration[] = declarations.length ? [...declarations, variableDeclarationUnique] : [variableDeclarationUnique];
    return ts.createVariableStatement([], variables);
}

function assignPropertiesToUniqueVariable(uniqueVariable: ts.Identifier, properties: ts.AccessorDeclaration[]): ts.ExpressionStatement {
    const propertiesObject: ts.ObjectLiteralExpression = ts.createObjectLiteral(properties, true);

    return assignVariableTo(uniqueVariable, propertiesObject);
}

function assignObjectSignatureToUniqueVariable(uniqueVariable: ts.Identifier, signatures: ReadonlyArray<ts.Signature>): ts.ExpressionStatement {
    const objectAssign: ts.CallExpression = GetObjectAssign(signatures, uniqueVariable);

    return assignVariableTo(uniqueVariable, objectAssign);
}

function assignVariableTo(variable: ts.Identifier, expression: ts.Expression): ts.ExpressionStatement {
    const binaryExpression: ts.BinaryExpression = ts.createBinary(variable, ts.SyntaxKind.EqualsToken, expression);
    return ts.createExpressionStatement(binaryExpression);
}

function GetMockMarkerPropertyAssignedTo(identifier: ts.Identifier): ts.ExpressionStatement {
    const mockMarkerProperty: Property = GetMockMarkerProperty();

    const argumentsDefineProperty: Array<ts.Identifier | ts.Expression | ts.ObjectLiteralExpression> = [
        identifier,
        mockMarkerProperty.name,
        ts.createObjectLiteral([ts.createPropertyAssignment('value', mockMarkerProperty.value)]),
    ];

    const objectDefineProperty: ts.PropertyAccessExpression = ts.createPropertyAccess(ts.createIdentifier('Object'), ts.createIdentifier('defineProperty'));
    const objectDefinePropertyCall: ts.CallExpression = ts.createCall(objectDefineProperty, [], argumentsDefineProperty);
    return ts.createExpressionStatement(objectDefinePropertyCall);
}

function CreateUniqueTsAutoMockVariable(): ts.Identifier  {
    return ts.createIdentifier('__tsAutoMockObjectReturnValue');
}

function GetObjectAssign(signatures: ReadonlyArray<ts.Signature>, uniqueVariable: ts.Identifier): ts.CallExpression {
    return ts.createCall(
        ts.createPropertyAccess(
            ts.createIdentifier('Object'),
            ts.createIdentifier('assign'),
        ),
        undefined,
        [
            GetDescriptor(signatures[0].declaration),
            uniqueVariable,
        ],
    );
}
