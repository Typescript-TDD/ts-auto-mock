import ts from 'typescript';
import { MethodSignature, TypescriptCreator } from '../../helper/creator';
import { Scope } from '../../scope/scope';
import { ResolveSignatureElseBranch } from '../helper/branching';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';
import { GetTypeParameterDescriptor } from '../typeParameter/typeParameter';

function isDeclarationWithTypeParameterChildren(node: ts.Node): node is ts.DeclarationWithTypeParameterChildren {
  return ts.isFunctionLike(node) ||
    ts.isClassLike(node) ||
    ts.isInterfaceDeclaration(node) ||
    ts.isTypeAliasDeclaration(node);
}

export function GetConditionalTypeDescriptor(node: ts.ConditionalTypeNode, scope: Scope): ts.Expression {
  const parentNode: ts.Node = node.parent;
  if (!isDeclarationWithTypeParameterChildren(parentNode)) {
    return GetNullDescriptor();
  }

  const checkType: ts.TypeNode = node.checkType;
  if (!ts.isTypeReferenceNode(checkType)) {
    return GetNullDescriptor();
  }

  const typeName: ts.EntityName = checkType.typeName;
  if (ts.isQualifiedName(typeName)) {
    return GetNullDescriptor();
  }

  const declarations: readonly ts.TypeParameterDeclaration[] = ts.getEffectiveTypeParameterDeclarations(parentNode);

  const declaration: ts.TypeParameterDeclaration | undefined = declarations.find(
    (parameter: ts.TypeParameterDeclaration) => parameter.name.escapedText === typeName.escapedText,
  );

  if (!declaration) {
    return GetNullDescriptor();
  }

  const statements: ts.Statement[] = [];

  const genericValue: ts.CallExpression = GetTypeParameterDescriptor(declaration, scope);

  const signatures: MethodSignature[] = ConstructSignatures(node);
  const [signature]: MethodSignature[] = signatures;

  const parameterIdentifier: ts.Identifier = TypescriptHelper.ExtractFirstIdentifier(signature.parameters[0].name);
  const valueDeclaration: ts.VariableDeclaration = TypescriptCreator.createVariableDeclaration(
    parameterIdentifier,
    genericValue,
  );

  statements.push(
    TypescriptCreator.createVariableStatement([
      valueDeclaration,
    ]),
  );

  const typeVariableMap: Map<ts.TypeNode, ts.StringLiteral | ts.Identifier> = new Map(
    signatures.reduce((typeHashTuples: [ts.TypeNode, ts.StringLiteral][], s: MethodSignature) => {
      const [parameter]: typeof s.parameters | [undefined] = s.parameters;
      if (!parameter) {
        return typeHashTuples;
      }

      if (ts.isFunctionLike(parameter.type)) {
        typeHashTuples.push([
          parameter.type,
          ts.createStringLiteral(
            TypescriptCreator.createSignatureHash(parameter.type),
          ),
        ]);
      }

      return typeHashTuples;
    }, [] as [ts.TypeNode, ts.StringLiteral][]),
  );

  statements.push(ResolveSignatureElseBranch(typeVariableMap, signatures, signature, scope));

  return TypescriptCreator.createIIFE(ts.createBlock(statements, true));
}

function ConstructSignatures(node: ts.ConditionalTypeNode, signatures: MethodSignature[] = []): MethodSignature[] {
  if (ts.isConditionalTypeNode(node.trueType)) {
    return ConstructSignatures(node.trueType, signatures);
  }

  signatures.push(TypescriptCreator.createMethodSignature([node.extendsType], node.trueType));

  if (ts.isConditionalTypeNode(node.falseType)) {
    return ConstructSignatures(node.falseType, signatures);
  }

  signatures.push(TypescriptCreator.createMethodSignature(undefined, node.falseType));

  return signatures;
}
