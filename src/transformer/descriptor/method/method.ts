import ts from 'typescript';
import { GetTsAutoMockOverloadOptions, TsAutoMockOverloadOptions } from '../../../options/overload';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { TypescriptHelper } from '../helper/helper';

export interface MethodSignature {
  parameters?: ts.ParameterDeclaration[];
  returnValue: ts.Expression;
}

export function GetMethodDescriptor(propertyName: ts.PropertyName, methodSignatures: MethodSignature[]): ts.CallExpression {
  const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

  const propertyNameString: string = TypescriptHelper.GetStringPropertyName(propertyName);
  const propertyNameStringLiteral: ts.StringLiteral = ts.createStringLiteral(propertyNameString);

  const signatureWithMostParameters: MethodSignature = methodSignatures.reduce(
    (acc: MethodSignature, signature: MethodSignature) => {
      const longestParametersLength: number = (acc.parameters || []).length;
      const parametersLength: number = (signature.parameters || []).length;

      return parametersLength < longestParametersLength ? acc : signature;
    },
  );

  const longestParameterList: ts.ParameterDeclaration[] = signatureWithMostParameters.parameters || [];

  const declarationVariableMap: Map<ts.ParameterDeclaration, ts.Identifier> = new Map<ts.ParameterDeclaration, ts.Identifier>();

  let i: number = 0;
  const declarationVariables: ts.VariableDeclaration[] = methodSignatures.reduce(
    (variables: ts.VariableDeclaration[], { parameters = [] }: MethodSignature) => {
      for (const parameter of parameters) {
        if (declarationVariableMap.has(parameter)) {
          continue;
        }

        const declarationType: ts.TypeNode | undefined = parameter.type;
        if (declarationType && ts.isTypeReferenceNode(declarationType)) {
          const variableIdentifier: ts.Identifier = ts.createIdentifier(`__${i++}`);

          declarationVariableMap.set(parameter, variableIdentifier);

          const declaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(declarationType.typeName);

          variables.push(
            TypescriptCreator.createVariableDeclaration(
              variableIdentifier,
              ts.createStringLiteral(MockDefiner.instance.getDeclarationKeyMap(declaration)),
            ),
          );
        }
      }

      return variables;
    }, [] as ts.VariableDeclaration[]);

  const statements: ts.Statement[] = [];

  if (declarationVariables.length) {
    statements.push(TypescriptCreator.createVariableStatement(declarationVariables));
  }

  statements.push(ResolveSignatureElseBranch(declarationVariableMap, methodSignatures, longestParameterList));

  const block: ts.Block = ts.createBlock(statements, true);

  const propertyValueFunction: ts.ArrowFunction = TypescriptCreator.createArrowFunction(
    block,
    longestParameterList,
  );

  return TypescriptCreator.createCall(providerGetMethod, [propertyNameStringLiteral, propertyValueFunction]);
}

function CreateTypeEquality(signatureType: ts.Identifier | ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration): ts.Expression {
  const identifier: ts.Identifier = ts.createIdentifier(primaryDeclaration.name.getText());

  if (!signatureType) {
    return ts.createPrefix(
      ts.SyntaxKind.ExclamationToken,
      ts.createPrefix(
        ts.SyntaxKind.ExclamationToken,
        identifier,
      ),
    );
  }

  if (TypescriptHelper.IsLiteralOrPrimitive(signatureType)) {
    return ts.createStrictEquality(
      ts.createTypeOf(identifier),
      signatureType ? ts.createStringLiteral(signatureType.getText()) : ts.createVoidZero(),
    );
  }

  if (ts.isIdentifier(signatureType)) {
    return ts.createStrictEquality(
      ts.createPropertyAccess(identifier, '__factory'),
      signatureType,
    );
  }

  return ts.createBinary(identifier, ts.SyntaxKind.InstanceOfKeyword, ts.createIdentifier('Object'));
}

function CreateUnionTypeOfEquality(signatureType: ts.Identifier | ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration): ts.Expression {
  const typeNodesAndVariableReferences: Array<ts.TypeNode | ts.Identifier> = [];

  if (signatureType) {
    if (ts.isTypeNode(signatureType) && ts.isUnionTypeNode(signatureType)) {
      typeNodesAndVariableReferences.push(...signatureType.types);
    } else {
      typeNodesAndVariableReferences.push(signatureType);
    }
  }

  const [firstType, ...remainingTypes]: Array<ts.TypeNode | ts.Identifier> = typeNodesAndVariableReferences;

  return remainingTypes.reduce(
    (prevStatement: ts.Expression, typeNode: ts.TypeNode) =>
      ts.createLogicalOr(
        prevStatement,
        CreateTypeEquality(typeNode, primaryDeclaration),
      ),
    CreateTypeEquality(firstType, primaryDeclaration),
  );
}

function ResolveParameterBranch(
  declarationVariableMap: Map<ts.ParameterDeclaration, ts.Identifier>,
  declarations: ts.ParameterDeclaration[],
  allDeclarations: ts.ParameterDeclaration[],
  returnValue: ts.Expression,
  elseBranch: ts.Statement,
): ts.Statement {
  const [firstDeclaration, ...remainingDeclarations]: Array<ts.ParameterDeclaration | undefined> = declarations;

  const variableReferenceOrType: (declaration: ts.ParameterDeclaration) => ts.Identifier | ts.TypeNode | undefined =
    (declaration: ts.ParameterDeclaration) => {
      if (declarationVariableMap.has(declaration)) {
        return declarationVariableMap.get(declaration);
      } else {
        return declaration.type;
      }
    };

  // TODO: These conditions quickly grow in size, but it should be possible to
  // squeeze things together and optimize it with something like:
  //
  // const typeOf = function (left, right) { return typeof left === right; }
  // const evaluate = (function(left, right) { return this._ = this._ || typeOf(left, right); }).bind({})
  //
  // if (evaluate(firstArg, 'boolean') && evaluate(secondArg, 'number') && ...) {
  //   ...
  // }
  //
  // `this._' acts as a cache, since the control flow may evaluate the same
  // conditions multiple times.
  const condition: ts.Expression = remainingDeclarations.reduce(
    (prevStatement: ts.Expression, declaration: ts.ParameterDeclaration, index: number) =>
      ts.createLogicalAnd(
        prevStatement,
        CreateUnionTypeOfEquality(variableReferenceOrType(declaration), allDeclarations[index + 1]),
      ),
    CreateUnionTypeOfEquality(variableReferenceOrType(firstDeclaration), allDeclarations[0]),
  );

  return ts.createIf(condition, ts.createReturn(returnValue), elseBranch);
}

export function ResolveSignatureElseBranch(
  declarationVariableMap: Map<ts.ParameterDeclaration, ts.Identifier>,
  signatures: MethodSignature[],
  longestParameterList: ts.ParameterDeclaration[],
): ts.Statement {
  const transformOverloadsOption: TsAutoMockOverloadOptions = GetTsAutoMockOverloadOptions();

  const [signature, ...remainingSignatures]: MethodSignature[] = signatures.filter((_: unknown, notFirst: number) => transformOverloadsOption || !notFirst);

  const indistinctSignatures: boolean = signatures.every((sig: MethodSignature) => !sig.parameters?.length);
  if (!remainingSignatures.length || indistinctSignatures) {
    return ts.createReturn(signature.returnValue);
  }

  const elseBranch: ts.Statement = ResolveSignatureElseBranch(declarationVariableMap, remainingSignatures, longestParameterList);

  const currentParameters: ts.ParameterDeclaration[] = signature.parameters || [];
  return ResolveParameterBranch(declarationVariableMap, currentParameters, longestParameterList, signature.returnValue, elseBranch);
}

function CreateProviderGetMethod(): ts.PropertyAccessExpression {
  return ts.createPropertyAccess(
    ts.createPropertyAccess(
      ts.createPropertyAccess(
        MockDefiner.instance.getCurrentModuleIdentifier(ModuleName.Extension),
        ts.createIdentifier('Provider'),
      ),
      ts.createIdentifier('instance')),
    ts.createIdentifier('getMethod'));
}
