import * as ts from 'typescript';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import {
  MockIdentifierGenericParameter,
  MockIdentifierGenericParameterIds,
  MockIdentifierGenericParameterValue,
} from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { TypeChecker } from '../../typeChecker/typeChecker';
import { GetDescriptor } from '../descriptor';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';
import {
  createArrowFunction,
  createBinaryExpression,
  createBlock,
  createCall,
  createIdentifier,
  createIfStatement,
  createIIFE,
  createNumericLiteral,
  createParameter,
  createPropertyAccess,
  createPunctuationToken,
  createReturnStatement,
  createStringLiteral,
  createVariableDeclaration,
  createVariableDeclarationList,
  createVariableStatement,
} from '../../../typescriptFactory/typescriptFactory';

export function GetTypeParameterDescriptor(
  node: ts.TypeParameterDeclaration,
  scope: Scope
): ts.Expression {
  const type: ts.TypeParameter = TypeChecker().getTypeAtLocation(node);

  const descriptor: ts.Expression = node.default
    ? GetDescriptor(node.default, scope)
    : GetNullDescriptor();

  const declaration: ts.Declaration = type.symbol.declarations[0];
  const typeDeclaration:
    | ts.Declaration
    | undefined = TypescriptHelper.GetTypeParameterOwnerMock(declaration);

  if (!typeDeclaration) {
    throw new Error(
      `Failed to determine the owner (parent) of the type parameter: \`${declaration.getText()}'.`
    );
  }

  const genericKey: string = MockDefiner.instance.getDeclarationKeyMapBasedOnScope(
    typeDeclaration,
    scope
  );

  return createFunctionToAccessToGenericValue(
    genericKey + node.name.escapedText.toString(),
    descriptor
  );
}

function createFunctionToAccessToGenericValue(
  key: string,
  descriptor: ts.Expression
): ts.CallExpression {
  const returnWhenGenericDoesNotExist: ts.ReturnStatement = createReturnStatement(
    descriptor
  );

  const expressionWhenGenericExist: ts.IfStatement = getValueFromGenericIfExist();

  const findGenericCall: ts.CallExpression = createFindGeneric(key);

  const generic: ts.VariableStatement = assignGenericConstToCall(
    findGenericCall
  );

  return createIIFE(
    createBlock(
      [generic, expressionWhenGenericExist, returnWhenGenericDoesNotExist],
      true
    )
  );
}

function createFindGeneric(genericKey: string): ts.CallExpression {
  return createCall(
    createPropertyAccess(
      MockIdentifierGenericParameter,
      createIdentifier('find')
    ),
    [
      createArrowFunction(
        createBlock(
          [
            createReturnStatement(
              createBinaryExpression(
                createCall(
                  createPropertyAccess(
                    createPropertyAccess(
                      createIdentifier('generic'),
                      MockIdentifierGenericParameterIds
                    ),
                    createIdentifier('indexOf')
                  ),
                  [createStringLiteral(genericKey)]
                ),
                createPunctuationToken(ts.SyntaxKind.GreaterThanEqualsToken),
                createNumericLiteral('0')
              )
            ),
          ],
          true
        ),
        [createParameter('generic')]
      ),
    ]
  );
}

function assignGenericConstToCall(
  call: ts.CallExpression
): ts.VariableStatement {
  return createVariableStatement(
    createVariableDeclarationList(
      [createVariableDeclaration(createIdentifier('generic'), call)],
      ts.NodeFlags.Const
    )
  );
}

function getValueFromGenericIfExist(): ts.IfStatement {
  return createIfStatement(
    createIdentifier('generic'),
    createBlock(
      [
        createReturnStatement(
          createCall(
            createPropertyAccess(
              createIdentifier('generic'),
              MockIdentifierGenericParameterValue
            ),
            []
          )
        ),
      ],
      true
    )
  );
}
