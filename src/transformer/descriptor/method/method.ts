import ts from 'typescript';
import { GetTsAutoMockFeaturesOptions, TsAutoMockFeaturesOptions } from '../../../options/features';
import { MethodSignature, TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { Scope } from '../../scope/scope';
import { ResolveSignatureElseBranch } from '../helper/branching';
import { TypescriptHelper } from '../helper/helper';

export function GetMethodDescriptor(propertyName: ts.PropertyName, methodSignatures: MethodSignature[], scope: Scope): ts.CallExpression {
  const providerGetMethod: ts.PropertyAccessExpression = CreateProviderGetMethod();

  const propertyNameString: string = TypescriptHelper.GetStringPropertyName(propertyName);
  const propertyNameStringLiteral: ts.StringLiteral = ts.createStringLiteral(propertyNameString);

  const features: TsAutoMockFeaturesOptions = GetTsAutoMockFeaturesOptions();

  const signatures: MethodSignature[] = methodSignatures.filter((_: unknown, notFirst: number) => features.includes('transformOverloads') || !notFirst);

  const signatureWithMostParameters: MethodSignature = signatures.reduce(
    (acc: MethodSignature, signature: MethodSignature) => {
      const longestParametersLength: number = (acc.parameters || []).length;
      const parametersLength: number = (signature.parameters || []).length;

      return parametersLength < longestParametersLength ? acc : signature;
    },
  );

  const declarationVariableMap: Map<ts.TypeNode, ts.Identifier> = new Map<ts.TypeNode, ts.Identifier>();

  let i: number = 0;
  const declarationVariables: ts.VariableDeclaration[] = signatures.reduce(
    (variables: ts.VariableDeclaration[], { parameters }: MethodSignature) => {
      for (const parameter of parameters) {
        if (declarationVariableMap.has(parameter.type)) {
          continue;
        }

        const declarationType: ts.TypeNode | undefined = parameter.type;
        if (declarationType && ts.isTypeReferenceNode(declarationType)) {
          const variableIdentifier: ts.Identifier = ts.createIdentifier(`___${i++}`);

          declarationVariableMap.set(parameter.type, variableIdentifier);

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

  statements.push(ResolveSignatureElseBranch(declarationVariableMap, signatures, signatureWithMostParameters, scope));

  const block: ts.Block = ts.createBlock(statements, true);

  const propertyValueFunction: ts.ArrowFunction = TypescriptCreator.createArrowFunction(
    block,
    signatureWithMostParameters.parameters,
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
