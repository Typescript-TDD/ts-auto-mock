import ts from 'typescript';
import { MethodSignature } from '../../helper/creator';
import { TypescriptHelper } from '../helper/helper';
import { GetDescriptor } from '../descriptor';
import { Scope } from '../../scope/scope';

function CreateTypeEquality(typeVariableMap: Map<ts.TypeNode, ts.StringLiteral | ts.Identifier>, parameterType: ts.TypeNode | undefined, primaryDeclaration: ts.ParameterDeclaration): ts.Expression {
  const declarationName: ts.Identifier = TypescriptHelper.ExtractFirstIdentifier(primaryDeclaration.name);

  if (!parameterType) {
    return ts.createPrefix(
      ts.SyntaxKind.ExclamationToken,
      ts.createPrefix(
        ts.SyntaxKind.ExclamationToken,
        declarationName,
      ),
    );
  }

  if (TypescriptHelper.IsLiteralOrPrimitive(parameterType)) {
    return ts.createStrictEquality(
      ts.createTypeOf(declarationName),
      parameterType ? ts.createStringLiteral(parameterType.getText()) : ts.createVoidZero(),
    );
  }

  if (typeVariableMap.has(parameterType)) {
    // eslint-disable-next-line
    const parameterIdentifier: ts.StringLiteral | ts.Identifier = typeVariableMap.get(parameterType)!;
    return ts.createStrictEquality(
      ts.createLogicalAnd(declarationName, ts.createPropertyAccess(declarationName, '__ident')),
      parameterIdentifier,
    );
  }
  return ts.createBinary(declarationName, ts.SyntaxKind.InstanceOfKeyword, ts.createIdentifier('Object'));
}

function CreateUnionTypeOfEquality(
  typeVariableMap: Map<ts.TypeNode, ts.StringLiteral | ts.Identifier>,
  signatureType: ts.TypeNode | undefined,
  primaryDeclaration: ts.ParameterDeclaration,
): ts.Expression {
  const typeNodesAndVariableReferences: Array<ts.TypeNode> = [];

  if (signatureType) {
    if (ts.isTypeNode(signatureType) && ts.isUnionTypeNode(signatureType)) {
      typeNodesAndVariableReferences.push(...signatureType.types);
    } else {
      typeNodesAndVariableReferences.push(signatureType);
    }
  }

  const [firstType, ...remainingTypes]: Array<ts.TypeNode> = typeNodesAndVariableReferences;

  return remainingTypes.reduce(
    (prevStatement: ts.Expression, typeNode: ts.TypeNode) =>
      ts.createLogicalOr(
        prevStatement,
        CreateTypeEquality(typeVariableMap, typeNode, primaryDeclaration),
      ),
    CreateTypeEquality(typeVariableMap, firstType, primaryDeclaration),
  );
}

function ResolveParameterBranch(
  typeVariableMap: Map<ts.TypeNode, ts.StringLiteral | ts.Identifier>,
  declarations: ts.NodeArray<ts.ParameterDeclaration> | [undefined],
  longedSignature: MethodSignature,
  returnType: ts.TypeNode,
  elseBranch: ts.Statement,
  scope: Scope,
): ts.Statement {
  // NOTE: The strange signature here is to cover an empty list of declarations,
  // then firstDeclaration will be undefined.
  const [firstDeclaration, ...remainingDeclarations]: ts.NodeArray<ts.ParameterDeclaration> | [undefined] = declarations;

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
        CreateUnionTypeOfEquality(typeVariableMap, declaration.type, longedSignature.parameters[index + 1]),
      ),
    CreateUnionTypeOfEquality(typeVariableMap, firstDeclaration?.type, longedSignature.parameters[0]),
  );

  return ts.createIf(condition, ts.createReturn(GetDescriptor(returnType, scope)), elseBranch);
}

export function ResolveSignatureElseBranch(
  typeVariableMap: Map<ts.TypeNode, ts.StringLiteral | ts.Identifier>,
  signatures: MethodSignature[],
  longestParameterList: MethodSignature,
  scope: Scope,
): ts.Statement {
  const [signature, ...remainingSignatures]: MethodSignature[] = signatures;

  const indistinctSignatures: boolean = signatures.every((sig: ts.MethodSignature) => !sig.parameters?.length);
  if (!remainingSignatures.length || indistinctSignatures) {
    return ts.createReturn(GetDescriptor(signature.type, scope));
  }

  const elseBranch: ts.Statement = ResolveSignatureElseBranch(typeVariableMap, remainingSignatures, longestParameterList, scope);

  const currentParameters: ts.NodeArray<ts.ParameterDeclaration> = signature.parameters || [];
  return ResolveParameterBranch(typeVariableMap, currentParameters, longestParameterList, signature.type, elseBranch, scope);
}
