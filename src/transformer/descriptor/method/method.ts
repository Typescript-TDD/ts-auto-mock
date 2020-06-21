import ts from 'typescript';
import { IsTsAutoMockOverloadsEnabled } from '../../../options/overloads';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { MockIdentifierJumpTable } from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { TypescriptHelper } from '../helper/helper';
import { GetDescriptor } from '../descriptor';
import { GetReturnNodeFromBody } from './bodyReturnType';

type MethodDeclaration =
  | ts.ArrowFunction
  | ts.FunctionExpression
  | ts.MethodSignature
  | ts.FunctionTypeNode
  | ts.CallSignatureDeclaration
  | ts.ConstructSignatureDeclaration
  | ts.MethodDeclaration
  | ts.FunctionDeclaration;

function GetDeclarationType(declaration: ts.SignatureDeclaration): ts.TypeNode {
  if (declaration.type) {
    return declaration.type;
  }

  return ts.createLiteralTypeNode(GetReturnNodeFromBody(declaration) as ts.LiteralExpression);
}

export function GetMethodDescriptor(
  propertyName: ts.PropertyName,
  methodDeclarations: ReadonlyArray<MethodDeclaration>,
  scope: Scope,
): ts.CallExpression {
  const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

  const propertyNameString: string = TypescriptHelper.GetStringPropertyName(propertyName);
  const propertyNameStringLiteral: ts.StringLiteral = ts.createStringLiteral(propertyNameString);

  const statements: ts.Statement[] = [];

  const [primaryDeclaration, ...remainingDeclarations]: ReadonlyArray<MethodDeclaration> = methodDeclarations;

  if (remainingDeclarations.length && IsTsAutoMockOverloadsEnabled()) {
    const jumpTableEntries: ts.PropertyAssignment[] = methodDeclarations.map((declaration: ts.FunctionDeclaration) =>
      ts.createPropertyAssignment(
        ts.createComputedPropertyName(
          ts.createStringLiteral(
            MockDefiner.instance.getDeclarationKeyMap(declaration),
          ),
        ),
        TypescriptCreator.createArrowFunction(
          GetDescriptor(GetDeclarationType(declaration), scope),
          [],
        ),
      ),
    );

    statements.push(
      TypescriptCreator.createVariableStatement([
        TypescriptCreator.createVariableDeclaration(
          MockIdentifierJumpTable,
          ts.createObjectLiteral(jumpTableEntries),
        ),
      ]),
    );

    statements.push(
      ts.createReturn(
        TypescriptCreator.createCall(
          ts.createElementAccess(
            MockIdentifierJumpTable,
            ts.createIdentifier('this'),
          ),
          [],
        ),
      ),
    );
  } else {
    statements.push(
      ts.createReturn(
        GetDescriptor(GetDeclarationType(primaryDeclaration), scope),
      ),
    );
  }

  const block: ts.Block = ts.createBlock(statements, true);

  const propertyValueFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(
    block,
    [],
  );

  return TypescriptCreator.createCall(providerGetMethod, [propertyNameStringLiteral, propertyValueFunction]);
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        ts.createIdentifier('Provider'),
      ),
      ts.createIdentifier('instance')),
    ts.createIdentifier('getMethod'),
  );
}
