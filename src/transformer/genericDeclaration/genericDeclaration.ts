import * as ts from 'typescript';
import { GetDescriptor } from '../descriptor/descriptor';
import { TypescriptHelper } from '../descriptor/helper/helper';
import { TypescriptCreator } from '../helper/creator';
import { MockIdentifierGenericParameterIds, MockIdentifierGenericParameterValue } from '../mockIdentifier/mockIdentifier';
import { Scope } from '../scope/scope';
import { IGenericDeclaration } from './genericDeclaration.interface';
import { GenericDeclarationSupported } from './genericDeclarationSupported';
import { GenericParameter } from './genericParameter';

function isInstantiable(node: ts.Declaration | undefined): boolean {
  let actualType: ts.Node | undefined = node;

  if (!actualType) {
    return false;
  }

  while (ts.isTypeAliasDeclaration(actualType)) {
    actualType = actualType.type;
  }

  return !TypescriptHelper.IsLiteralOrPrimitive(actualType);
}

export function GenericDeclaration(scope: Scope): IGenericDeclaration {
  const generics: GenericParameter[] = [];

  function isGenericProvided<T extends ts.TypeReferenceNode | ts.ExpressionWithTypeArguments>(node: T, index: number): node is T & Required<ts.NodeWithTypeArguments> {
    return !!node.typeArguments && !!node.typeArguments[index];
  }

  function getGenericNode(node: ts.TypeReferenceNode | ts.ExpressionWithTypeArguments, nodeDeclaration: ts.TypeParameterDeclaration, index: number): ts.TypeNode {
    if (isGenericProvided(node, index)) {
      return node.typeArguments[index];
    }

    return nodeDeclaration.default || ts.createNull();
  }

  function addGenericParameterToExisting(
    ownerParameterDeclaration: ts.TypeParameterDeclaration,
    typeParameterDeclaration: ts.TypeParameterDeclaration,
    declarationKey: string,
    extensionDeclarationKey: string): void {
    const existingUniqueName: string = declarationKey + typeParameterDeclaration.name.escapedText.toString();
    const uniqueName: string = extensionDeclarationKey + ownerParameterDeclaration.name.escapedText.toString();

    const parameterToAdd: GenericParameter | undefined = generics.find((genericParameter: GenericParameter) => genericParameter.ids.includes(existingUniqueName));

    if (parameterToAdd?.ids) {
      parameterToAdd.ids.push(uniqueName);
    }
  }

  function createGenericParameter(ownerKey: string, nodeOwnerParameter: ts.TypeParameterDeclaration, genericDescriptor: ts.Expression | undefined, instantiable: boolean): GenericParameter {
    const uniqueName: string = ownerKey + nodeOwnerParameter.name.escapedText.toString();

    const genericValueDescriptor: ts.Expression = ((): ts.Expression => {
      if (!instantiable) {
        return genericDescriptor || ts.createNull();
      }

      return ts.createNew(
        genericDescriptor ? TypescriptCreator.createFunctionExpression(
          ts.createBlock(
            [
              ts.createExpressionStatement(
                ts.createCall(
                  ts.createPropertyAccess(
                    ts.createIdentifier('Object'),
                    ts.createIdentifier('assign'),
                  ),
                  undefined,
                  [
                    ts.createIdentifier('this'),
                    genericDescriptor,
                  ]
                ),
              ),
            ],
          ),
        ) : ts.createPropertyAccess(
          ts.createIdentifier('this'),
          ts.createIdentifier('constructor'),
        ),
        undefined,
        undefined,
      );
    })();

    const genericFunction: ts.FunctionExpression =
      TypescriptCreator.createFunctionExpression(
        ts.createBlock([
          ts.createReturn(
            genericValueDescriptor,
          ),
        ]),
      );

    return {
      ids: [uniqueName],
      value: genericFunction,
    };
  }

  return {
    addFromTypeReferenceNode(node: ts.TypeReferenceNode, declarationKey: string): void {
      const typeParameterDeclarations: ts.NodeArray<ts.TypeParameterDeclaration> | undefined = TypescriptHelper.GetParameterOfNode(node.typeName);

      if (!typeParameterDeclarations?.length) {
        return;
      }

      typeParameterDeclarations.forEach((declaration: ts.TypeParameterDeclaration, index: number) => {
        const genericNode: ts.Node = getGenericNode(node, declaration, index);

        const genericParameter: GenericParameter = createGenericParameter(
          declarationKey,
          typeParameterDeclarations[index],
          GetDescriptor(genericNode, scope),
          false,
        );

        generics.push(genericParameter);
      });

    },
    addFromDeclarationExtension(
      declarationKey: string,
      extensionDeclaration: GenericDeclarationSupported,
      extensionDeclarationKey: string,
      extension: ts.ExpressionWithTypeArguments): void {
      const extensionDeclarationTypeParameters: ts.NodeArray<ts.TypeParameterDeclaration> | undefined = extensionDeclaration.typeParameters;

      if (!extensionDeclarationTypeParameters?.length) {
        return;
      }

      extensionDeclarationTypeParameters.reduce((acc: GenericParameter[], declaration: ts.TypeParameterDeclaration, index: number) => {
        const genericNode: ts.Node = getGenericNode(extension, declaration, index);

        let typeParameterDeclaration: ts.Declaration | undefined;
        let genericValueDescriptor: ts.Expression | undefined;

        if (ts.isTypeReferenceNode(genericNode)) {
          typeParameterDeclaration = TypescriptHelper.GetDeclarationFromNode(genericNode.typeName);

          if (ts.isTypeParameterDeclaration(typeParameterDeclaration)) {
            addGenericParameterToExisting(
              extensionDeclarationTypeParameters[index],
              typeParameterDeclaration,
              declarationKey,
              extensionDeclarationKey,
            );

            return acc;
          }
        }

        if (!typeParameterDeclaration || scope.currentMockKey !== declarationKey) {
          genericValueDescriptor = GetDescriptor(genericNode, new Scope(declarationKey));
        }

        const genericParameter: GenericParameter = createGenericParameter(
          extensionDeclarationKey,
          declaration,
          genericValueDescriptor,
          isInstantiable(typeParameterDeclaration),
        );

        acc.push(genericParameter);

        return acc;
      }, generics);
    },
    getExpressionForAllGenerics(): ts.ObjectLiteralExpression[] {
      return generics.map((s: GenericParameter) => ts.createObjectLiteral(
        [
          ts.createPropertyAssignment(
            MockIdentifierGenericParameterIds,
            ts.createArrayLiteral(
              s.ids.map((arr: string) => ts.createStringLiteral(arr)),
              false,
            ),
          ),
          ts.createPropertyAssignment(
            MockIdentifierGenericParameterValue,
            s.value,
          ),
        ],
        true,
      ));
    },
  };
}
