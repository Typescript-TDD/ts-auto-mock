import type ts from 'typescript';
import type {
  ArrayLiteralExpression,
  BigIntLiteral,
  BinaryExpression,
  BinaryOperator,
  BinaryOperatorToken,
  Block,
  CallExpression,
  ColonToken,
  ConditionalExpression,
  ElementAccessExpression,
  EmptyStatement,
  Expression,
  ExpressionStatement,
  ForStatement,
  FunctionExpression,
  FunctionTypeNode,
  Identifier,
  IfStatement,
  ImportDeclaration,
  KeywordTypeNode,
  KeywordTypeSyntaxKind,
  LiteralType,
  MethodDeclaration,
  Node,
  NodeArray,
  NodeFlags,
  NullLiteral,
  NumericLiteral,
  ObjectLiteralElementLike,
  ObjectLiteralExpression,
  ParameterDeclaration,
  PostfixUnaryExpression,
  PostfixUnaryOperator,
  PrefixUnaryExpression,
  PrivateIdentifier,
  PropertyAccessExpression,
  PropertyAssignment,
  PropertyDeclaration,
  PropertyName,
  PropertySignature,
  PunctuationSyntaxKind,
  PunctuationToken,
  QuestionToken,
  ReturnStatement,
  SourceFile,
  SpreadElement,
  StringLiteral,
  TokenFlags,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeQueryNode,
  TypeReferenceNode,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
  VoidExpression,
} from 'typescript';
import { Statement } from 'typescript/lib/tsserverlibrary';
import { core } from '../transformer/core/core';

export function createArrayLiteral(
  elements?: readonly Expression[],
  multiLine?: boolean
): ArrayLiteralExpression {
  return core.ts.factory.createArrayLiteralExpression(elements, multiLine);
}

export function createVariableStatement(
  declarationList: VariableDeclarationList | readonly VariableDeclaration[]
): VariableStatement {
  return core.ts.factory.createVariableStatement(undefined, declarationList);
}

export function createVariableDeclarationList(
  declarations: readonly VariableDeclaration[],
  flags?: NodeFlags
): VariableDeclarationList {
  return core.ts.factory.createVariableDeclarationList(declarations, flags);
}

export function createIdentifier(text: string): Identifier {
  return core.ts.factory.createIdentifier(text);
}

export function createNumericLiteral(
  value: string | number,
  numericLiteralFlags?: TokenFlags
): NumericLiteral {
  return core.ts.factory.createNumericLiteral(value, numericLiteralFlags);
}

export function createArrowFunction(
  block: ts.ConciseBody,
  parameter: ReadonlyArray<ts.ParameterDeclaration> = []
): ts.ArrowFunction {
  return core.ts.factory.createArrowFunction(
    undefined,
    undefined,
    parameter,
    undefined,
    core.ts.factory.createToken(core.ts.SyntaxKind.EqualsGreaterThanToken),
    block
  );
}

export function createFunctionExpression(
  block: Block,
  parameter: ReadonlyArray<ParameterDeclaration> = []
): FunctionExpression {
  return core.ts.factory.createFunctionExpression(
    undefined,
    undefined,
    undefined,
    undefined,
    parameter,
    undefined,
    block
  );
}

export function createFunctionExpressionReturn(
  descriptorToReturn: Expression,
  parameter: ReadonlyArray<ParameterDeclaration> = []
): FunctionExpression {
  const block: Block = core.ts.factory.createBlock([
    core.ts.factory.createReturnStatement(descriptorToReturn),
  ]);

  return core.ts.factory.createFunctionExpression(
    undefined,
    undefined,
    undefined,
    undefined,
    parameter,
    undefined,
    block
  );
}

export function createBlock(
  statements: readonly Statement[],
  multiLine?: boolean | undefined
): Block {
  return core.ts.factory.createBlock(statements, multiLine);
}

export function createReturnStatement(
  expression?: Expression
): ReturnStatement {
  return core.ts.factory.createReturnStatement(expression);
}

export function createCall(
  expression: Expression,
  argumentExpressions: Expression[]
): CallExpression {
  return core.ts.factory.createCallExpression(
    expression,
    undefined,
    argumentExpressions
  );
}

export function createIIFE(block: Block): CallExpression {
  return createCall(
    core.ts.factory.createParenthesizedExpression(
      core.ts.factory.createFunctionExpression(
        undefined,
        undefined,
        undefined,
        undefined,
        [],
        undefined,
        block
      )
    ),
    []
  );
}

export function createEmptyProperty(): PropertyDeclaration {
  return createProperty('', undefined);
}

export function createProperty(
  propertyName: string | PropertyName,
  type: TypeNode | undefined
): PropertyDeclaration {
  return core.ts.factory.createPropertyDeclaration(
    undefined,
    undefined,
    propertyName,
    undefined,
    type,
    undefined
  );
}

export function createPropertySignature(
  propertyName: string | PropertyName,
  type: TypeNode
): PropertySignature {
  return core.ts.factory.createPropertySignature(
    [],
    propertyName,
    undefined,
    type
  );
}

export function createParameter(parameterName: string): ParameterDeclaration {
  return core.ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    createIdentifier(parameterName),
    undefined,
    undefined,
    undefined
  );
}

export function createParameterFromIdentifier(
  identifier: Identifier
): ParameterDeclaration {
  return core.ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    identifier,
    undefined,
    undefined,
    undefined
  );
}

export function createMethod(
  methodName: string,
  body: Block,
  parameterNames: Identifier[] = []
): MethodDeclaration {
  const parameters: ParameterDeclaration[] = parameterNames.map(
    (parameterName: Identifier) =>
      core.ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        parameterName,
        undefined,
        undefined,
        undefined
      )
  );
  return core.ts.factory.createMethodDeclaration(
    undefined,
    undefined,
    undefined,
    createIdentifier(methodName),
    undefined,
    undefined,
    parameters,
    undefined,
    body
  );
}

export function createVariableDeclaration(
  variableIdentifier: Identifier,
  initializer: Expression
): VariableDeclaration {
  return core.ts.factory.createVariableDeclaration(
    variableIdentifier,
    undefined,
    undefined,
    initializer
  );
}

export function createPropertyAccess(
  expression: Expression,
  name: string | Identifier | PrivateIdentifier
): PropertyAccessExpression {
  return core.ts.factory.createPropertyAccessExpression(expression, name);
}

export function createSpread(expression: Expression): SpreadElement {
  return core.ts.factory.createSpreadElement(expression);
}

export function createStringLiteral(text: string): StringLiteral {
  return core.ts.factory.createStringLiteral(text);
}

export function createLogicalNot(operand: Expression): PrefixUnaryExpression {
  return core.ts.factory.createLogicalNot(operand);
}

export function createLiteral(
  type: LiteralType
): StringLiteral | NumericLiteral | BigIntLiteral {
  if (typeof type.value === 'string') {
    return createStringLiteral(type.value);
  }

  if (typeof type.value === 'number') {
    return createNumericLiteral(type.value);
  }

  return core.ts.factory.createBigIntLiteral(type.value);
}

export function createNodeArray<T extends Node>(
  elements?: readonly T[],
  hasTrailingComma?: boolean
): NodeArray<T> {
  return core.ts.factory.createNodeArray(elements, hasTrailingComma);
}

export function createArrayTypeNode(): Node {
  return core.ts.factory.createArrayTypeNode(
    core.ts.factory.createKeywordTypeNode(core.ts.SyntaxKind.AnyKeyword)
  );
}

export function createTypeNode<TKind extends KeywordTypeSyntaxKind>(
  kind: TKind
): KeywordTypeNode<TKind> {
  return core.ts.factory.createKeywordTypeNode(kind);
}

export function createFunctionTypeNode(typeNode: TypeNode): FunctionTypeNode {
  return core.ts.factory.createFunctionTypeNode([], [], typeNode);
}

export function createNode(): Node {
  return core.ts.factory.createKeywordTypeNode(
    core.ts.SyntaxKind.NumberKeyword
  );
}

export function createObjectLiteral(
  properties?: readonly ObjectLiteralElementLike[],
  multiLine?: boolean
): ObjectLiteralExpression {
  return core.ts.factory.createObjectLiteralExpression(properties, multiLine);
}

export function createBinaryExpression(
  left: Expression,
  operator: BinaryOperator | BinaryOperatorToken,
  right: Expression
): BinaryExpression {
  return core.ts.factory.createBinaryExpression(left, operator, right);
}

export function createPunctuationToken<TKind extends PunctuationSyntaxKind>(
  token: TKind
): PunctuationToken<TKind> {
  return core.ts.factory.createToken(token);
}

export function createIfStatement(
  expression: Expression,
  block: Block
): IfStatement {
  return core.ts.factory.createIfStatement(expression, block, undefined);
}

export function createReturn(expression: Expression): ReturnStatement {
  return core.ts.factory.createReturnStatement(expression);
}

export function createExpressionStatement(
  binaryExpression: Expression
): ExpressionStatement {
  return core.ts.factory.createExpressionStatement(binaryExpression);
}

export function createElementAccessExpression(
  identifier: Identifier,
  literalProperty: StringLiteral
): ElementAccessExpression {
  return core.ts.factory.createElementAccessExpression(
    identifier,
    literalProperty
  );
}

export function createPropertyAssignment(
  name: string | PropertyName,
  expression: ts.Expression
): PropertyAssignment {
  return core.ts.factory.createPropertyAssignment(name, expression);
}

export function createElementAccess(
  expression: Expression,
  index: number | Expression
): ElementAccessExpression {
  return core.ts.factory.createElementAccessExpression(expression, index);
}

export function createConditional(
  condition: Expression,
  questionToken: QuestionToken | undefined,
  whenTrue: Expression,
  colonToken: ColonToken | undefined,
  whenFalse: Expression
): ConditionalExpression {
  return core.ts.factory.createConditionalExpression(
    condition,
    questionToken,
    whenTrue,
    colonToken,
    whenFalse
  );
}

export function updateSourceFileNode(
  node: SourceFile,
  statements: readonly Statement[]
): SourceFile {
  return core.ts.factory.updateSourceFile(node, statements);
}

export function createImportAllAs(
  moduleName,
  filenameToImportFrom
): ImportDeclaration {
  return core.ts.factory.createImportDeclaration(
    [],
    [],
    core.ts.factory.createImportClause(
      false,
      undefined,
      core.ts.factory.createNamespaceImport(moduleName)
    ),
    core.ts.factory.createStringLiteral(filenameToImportFrom)
  );
}

export function createForStatement(
  initializer: Expression | VariableDeclarationList | undefined,
  condition: Expression | undefined,
  incrementor: Expression | undefined,
  statement: Statement
): ForStatement {
  return core.ts.factory.createForStatement(
    initializer,
    condition,
    incrementor,
    statement
  );
}

export function createPostfix(
  operand: Expression,
  operator: PostfixUnaryOperator
): PostfixUnaryExpression {
  return core.ts.factory.createPostfixUnaryExpression(operand, operator);
}

export function createEmptyStatement(): EmptyStatement {
  return core.ts.factory.createEmptyStatement();
}

export function createTypeReferenceNode(
  identifier: Identifier
): TypeReferenceNode {
  return core.ts.factory.createTypeReferenceNode(identifier, undefined);
}

export function createNew(expression: Expression): Expression {
  return core.ts.factory.createNewExpression(expression, undefined, undefined);
}

export function createNull(): NullLiteral {
  return core.ts.factory.createNull();
}

export function createTypeQueryNode(identifier: Identifier): TypeQueryNode {
  return core.ts.factory.createTypeQueryNode(identifier);
}

export function createTypeLiteralNode(
  typeElements: readonly TypeElement[]
): TypeLiteralNode {
  return core.ts.factory.createTypeLiteralNode(typeElements);
}

export function createVoidZero(): VoidExpression {
  return core.ts.factory.createVoidZero();
}
