import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { TypescriptCreator } from '../helper/creator';
import { TransformerLogger } from '../logger/transformerLogger';
import { MockDefiner } from '../mockDefiner/mockDefiner';
import {
  MockIdentifierGenericParameterIds,
  MockIdentifierGenericParameterValue,
} from '../mockIdentifier/mockIdentifier';
import { Scope } from '../scope/scope';
import { IGenericDeclaration } from './genericDeclaration.interface';
import { GenericDeclarationSupported } from './genericDeclarationSupported';
import { GenericParameter } from './genericParameter';

export function GenericDeclaration(scope: Scope): IGenericDeclaration {
  const generics: GenericParameter[] = [];

  function isGenericProvided<
    T extends ts.TypeReferenceNode | ts.ExpressionWithTypeArguments
  >(node: T, index: number): node is T & Required<ts.NodeWithTypeArguments> {
    return !!node.typeArguments && !!node.typeArguments[index];
  }

  function getGenericNode(
    node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments,
    nodeDeclaration: ts.TypeParameterDeclaration,
    index: number
  ): ts.Node {
    if (isGenericProvided(node, index)) {
      return node.typeArguments[index];
    }

    return nodeDeclaration.default || ts.createNull();
  }

  function addGenericParameterToExisting(
    ownerParameterDeclaration: ts.TypeParameterDeclaration,
    typeParameterDeclaration: ts.TypeParameterDeclaration,
    declarationKey: string,
    extensionDeclarationKey: string
  ): void {
    const existingUniqueName: string =
      declarationKey + typeParameterDeclaration.name.escapedText.toString();
    const uniqueName: string =
      extensionDeclarationKey +
      ownerParameterDeclaration.name.escapedText.toString();

    const parameterToAdd:
      | GenericParameter
      | undefined = generics.find((genericParameter: GenericParameter) =>
      genericParameter.ids.includes(existingUniqueName)
    );

    if (parameterToAdd?.ids) {
      parameterToAdd.ids.push(uniqueName);
    }
  }

  function createGenericParameter(
    ownerKey: string,
    nodeOwnerParameter: ts.TypeParameterDeclaration,
    genericDescriptor: ts.Expression
  ): GenericParameter {
    const uniqueName: string =
      ownerKey + nodeOwnerParameter.name.escapedText.toString();
    const genericFunction: ts.FunctionExpression = TypescriptCreator.createFunctionExpression(
      ts.createBlock([ts.createReturn(genericDescriptor)])
    );

    return {
      ids: [uniqueName],
      value: genericFunction,
    };
  }

  return {
    addFromTypeReferenceNode(
      node: ts.TypeReferenceNode,
      declarationKey: string
    ): void {
      const typeParameterDeclarations: ts.NodeArray<ts.TypeParameterDeclaration> = TypescriptHelper.GetParameterOfNode(
        node.typeName
      );

      if (!typeParameterDeclarations) {
        return;
      }

      typeParameterDeclarations.forEach(
        (declaration: ts.TypeParameterDeclaration, index: number) => {
          const genericNode: ts.Node = getGenericNode(node, declaration, index);

          const genericParameter: GenericParameter = createGenericParameter(
            declarationKey,
            typeParameterDeclarations[index],
            GetDescriptor(genericNode, scope)
          );

          generics.push(genericParameter);
        }
      );
    },
    addFromDeclarationExtension(
      declarationKey: string,
      extensionDeclaration: GenericDeclarationSupported,
      extensionDeclarationKey: string,
      extension: ts.ExpressionWithTypeArguments
    ): void {
      const extensionDeclarationTypeParameters:
        | ts.NodeArray<ts.TypeParameterDeclaration>
        | undefined = extensionDeclaration.typeParameters;

      if (!extensionDeclarationTypeParameters) {
        return;
      }

      extensionDeclarationTypeParameters.reduce(
        (
          acc: GenericParameter[],
          declaration: ts.TypeParameterDeclaration,
          index: number
        ) => {
          const genericNode: ts.Node = getGenericNode(
            extension,
            declaration,
            index
          );

          if (ts.isTypeReferenceNode(genericNode)) {
            const typeParameterDeclaration: ts.Declaration = TypescriptHelper.GetDeclarationFromNode(
              genericNode.typeName
            );

            const isExtendingItself: boolean =
              MockDefiner.instance.getDeclarationKeyMap(
                typeParameterDeclaration
              ) === declarationKey;
            if (isExtendingItself) {
              // FIXME: Currently, circular generics aren't supported. See
              // https://github.com/Typescript-TDD/ts-auto-mock/pull/312 for more
              // details.
              TransformerLogger().circularGenericNotSupported(
                genericNode.getText()
              );
              return acc;
            }

            if (ts.isTypeParameterDeclaration(typeParameterDeclaration)) {
              addGenericParameterToExisting(
                extensionDeclarationTypeParameters[index],
                typeParameterDeclaration,
                declarationKey,
                extensionDeclarationKey
              );

              return acc;
            }
          }

          const genericParameter: GenericParameter = createGenericParameter(
            extensionDeclarationKey,
            extensionDeclarationTypeParameters[index],
            GetDescriptor(genericNode, scope)
          );

          acc.push(genericParameter);

          return acc;
        },
        generics
      );
    },
    getExpressionForAllGenerics(): ts.ObjectLiteralExpression[] {
      return generics.map((s: GenericParameter) =>
        ts.createObjectLiteral(
          [
            ts.createPropertyAssignment(
              MockIdentifierGenericParameterIds,
              ts.createArrayLiteral(
                s.ids.map((arr: string) => ts.createStringLiteral(arr)),
                false
              )
            ),
            ts.createPropertyAssignment(
              MockIdentifierGenericParameterValue,
              s.value
            ),
          ],
          true
        )
      );
    },
  };
}
