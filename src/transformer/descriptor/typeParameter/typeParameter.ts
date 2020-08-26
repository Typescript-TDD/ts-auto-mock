import * as ts from 'typescript';
import { TypescriptCreator } from '../../helper/creator';
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

  const genericKey: string = MockDefiner.instance.getDeclarationKeyMap(
    typeDeclaration
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
  const returnWhenGenericDoesNotExist: ts.ReturnStatement = ts.createReturn(
    descriptor
  );

  const expressionWhenGenericExist: ts.IfStatement = getValueFromGenericIfExist();

  const findGenericCall: ts.CallExpression = createFindGeneric(key);

  const generic: ts.VariableStatement = assignGenericConstToCall(
    findGenericCall
  );

  return TypescriptCreator.createIIFE(
    ts.createBlock(
      [generic, expressionWhenGenericExist, returnWhenGenericDoesNotExist],
      true
    )
  );
}

function createFindGeneric(genericKey: string): ts.CallExpression {
  return ts.createCall(
    ts.createPropertyAccess(
      MockIdentifierGenericParameter,
      ts.createIdentifier('find')
    ),
    undefined,
    [
      TypescriptCreator.createArrowFunction(
        ts.createBlock(
          [
            ts.createReturn(
              ts.createBinary(
                ts.createCall(
                  ts.createPropertyAccess(
                    ts.createPropertyAccess(
                      ts.createIdentifier('generic'),
                      MockIdentifierGenericParameterIds
                    ),
                    ts.createIdentifier('indexOf')
                  ),
                  undefined,
                  [ts.createStringLiteral(genericKey)]
                ),
                ts.createToken(ts.SyntaxKind.GreaterThanEqualsToken),
                ts.createNumericLiteral('0')
              )
            ),
          ],
          true
        ),
        [TypescriptCreator.createParameter('generic')]
      ),
    ]
  );
}

function assignGenericConstToCall(
  call: ts.CallExpression
): ts.VariableStatement {
  return ts.createVariableStatement(
    undefined,
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier('generic'),
          undefined,
          call
        ),
      ],
      ts.NodeFlags.Const
    )
  );
}

function getValueFromGenericIfExist(): ts.IfStatement {
  return ts.createIf(
    ts.createIdentifier('generic'),
    ts.createBlock(
      [
        ts.createReturn(
          ts.createCall(
            ts.createPropertyAccess(
              ts.createIdentifier('generic'),
              MockIdentifierGenericParameterValue
            ),
            undefined,
            []
          )
        ),
      ],
      true
    ),
    undefined
  );
}
