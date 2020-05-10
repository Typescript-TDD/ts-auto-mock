import ts from 'typescript';
import { GetTsAutoMockOverloadOptions, TsAutoMockOverloadOptions } from '../../../options/overload';
import { TypescriptCreator } from '../../helper/creator';
import { MockDefiner } from '../../mockDefiner/mockDefiner';
import { ModuleName } from '../../mockDefiner/modules/moduleName';
import { MockIdentifierGenericParameterValue } from '../../mockIdentifier/mockIdentifier';
import { Scope } from '../../scope/scope';
import { TypescriptHelper } from '../helper/helper';
import { GetNullDescriptor } from '../null/null';
import { GetDescriptor } from '../descriptor';
import { GetTypeParameterDescriptor } from '../typeParameter/typeParameter';

export interface MethodSignature {
  parameters?: ts.TypeNode[];
  returnValue: ts.Expression;
}

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

  const genericValue: ts.CallExpression = GetTypeParameterDescriptor(declaration, scope);

  const statements: ts.Statement[] = [];

  const valueDeclaration: ts.VariableDeclaration = TypescriptCreator.createVariableDeclaration(
    MockIdentifierGenericParameterValue,
    genericValue,
  );

  statements.push(
    TypescriptCreator.createVariableStatement([
      valueDeclaration,
    ]),
  );

  statements.push(ResolveSignatureElseBranch(new Map(), ConstructSignatures(node, scope), [valueDeclaration]));

  return TypescriptCreator.createIIFE(ts.createBlock(statements, true));
}

function ConstructSignatures(node: ts.ConditionalTypeNode, scope: Scope, signatures: MethodSignature[] = []): MethodSignature[] {
  const parameters: ts.TypeNode[] = [node.extendsType];

  if (ts.isConditionalTypeNode(node.trueType)) {
    return ConstructSignatures(node.trueType, scope, signatures);
  }

  signatures.push({
    parameters,
    returnValue: GetDescriptor(node.trueType, scope),
  });

  if (ts.isConditionalTypeNode(node.falseType)) {
    return ConstructSignatures(node.falseType, scope, signatures);
  }

  signatures.push({
    parameters,
    returnValue: GetDescriptor(node.falseType, scope),
  });

  return signatures;
}

function CreateTypeEquality(signatureType: ts.Identifier | ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration | ts.VariableDeclaration): ts.Expression {
  // TODO: Factor this into a helper - guess it can be helpful in other places.
  let declarationName: ts.BindingName = primaryDeclaration.name;

  while (!ts.isIdentifier(declarationName)) {
    const [bindingElement]: Array<ts.BindingElement | undefined> = (declarationName.elements as ts.NodeArray<ts.ArrayBindingElement>).filter(ts.isBindingElement);
    if (!bindingElement) {
      throw new Error('Failed to find an identifier for the primary declaration!');
    }

    declarationName = bindingElement.name;
  }

  if (!signatureType) {
    return ts.createPrefix(
      ts.SyntaxKind.ExclamationToken,
      ts.createPrefix(
        ts.SyntaxKind.ExclamationToken,
        declarationName,
      ),
    );
  }

  if (TypescriptHelper.IsLiteralOrPrimitive(signatureType)) {
    return ts.createStrictEquality(
      ts.createTypeOf(declarationName),
      signatureType ? ts.createStringLiteral(signatureType.getText()) : ts.createVoidZero(),
    );
  }

  if (ts.isIdentifier(signatureType)) {
    return ts.createStrictEquality(
      ts.createPropertyAccess(declarationName, '__factory'),
      signatureType,
    );
  }

  return ts.createBinary(declarationName, ts.SyntaxKind.InstanceOfKeyword, ts.createIdentifier('Object'));
}

function CreateUnionTypeOfEquality(signatureType: ts.Identifier | ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration | ts.VariableDeclaration): ts.Expression {
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
  declarationVariableMap: Map<ts.Declaration, ts.Identifier>,
  declarations: ts.TypeNode[],
  allDeclarations: Array<ts.ParameterDeclaration | ts.VariableDeclaration>,
  returnValue: ts.Expression,
  elseBranch: ts.Statement,
): ts.Statement {
  const [firstDeclaration, ...remainingDeclarations]: Array<ts.TypeNode | undefined> = declarations;

  const variableReferenceOrType: (t: ts.TypeNode | undefined) => ts.Identifier | ts.TypeNode | undefined = (t: ts.TypeNode | undefined) => t;
  // const variableReferenceOrType: (declaration: ts.ParameterDeclaration) => ts.Identifier | ts.TypeNode | undefined =
  //   (declaration: ts.ParameterDeclaration) => {
  //     if (declarationVariableMap.has(declaration)) {
  //       return declarationVariableMap.get(declaration);
  //     } else {
  //       return declaration.type;
  //     }
  //   };

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
    (prevStatement: ts.Expression, node: ts.TypeNode | undefined, index: number) =>
      ts.createLogicalAnd(
        prevStatement,
        CreateUnionTypeOfEquality(variableReferenceOrType(node), allDeclarations[index + 1]),
      ),
    CreateUnionTypeOfEquality(variableReferenceOrType(firstDeclaration), allDeclarations[0]),
  );

  return ts.createIf(condition, ts.createReturn(returnValue), elseBranch);
}

export function ResolveSignatureElseBranch(
  declarationVariableMap: Map<ts.ParameterDeclaration, ts.Identifier>,
  signatures: MethodSignature[],
  longestParameterList: Array<ts.ParameterDeclaration | ts.VariableDeclaration>,
): ts.Statement {
  const transformOverloadsOption: TsAutoMockOverloadOptions = GetTsAutoMockOverloadOptions();

  const [signature, ...remainingSignatures]: MethodSignature[] = signatures.filter((_: unknown, notFirst: number) => transformOverloadsOption || !notFirst);

  const indistinctSignatures: boolean = signatures.every((sig: MethodSignature) => !sig.parameters?.length);
  if (!remainingSignatures.length || indistinctSignatures) {
    return ts.createReturn(signature.returnValue);
  }

  const elseBranch: ts.Statement = ResolveSignatureElseBranch(declarationVariableMap, remainingSignatures, longestParameterList);

  const currentParameters: ts.TypeNode[] = signature.parameters || [];
  return ResolveParameterBranch(declarationVariableMap, currentParameters, longestParameterList, signature.returnValue, elseBranch);
}
