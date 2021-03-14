import ts, {
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
  NodeFactory,
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
  SyntaxKind,
  TokenFlags,
  TypeElement,
  TypeLiteralNode,
  TypeNode,
  TypeQueryNode,
  TypeReferenceNode,
  VariableDeclaration,
  VariableDeclarationList,
  VariableStatement,
} from 'typescript';
import { Statement } from 'typescript/lib/tsserverlibrary';

const typescriptFactory: NodeFactory = ts.factory;

export function createArrayLiteral(
  elements?: readonly Expression[],
  multiLine?: boolean
): ArrayLiteralExpression {
  return typescriptFactory.createArrayLiteralExpression(elements, multiLine);
}

export function createVariableStatement(
  declarationList: VariableDeclarationList | readonly VariableDeclaration[]
): VariableStatement {
  return typescriptFactory.createVariableStatement(undefined, declarationList);
}

export function createVariableDeclarationList(
  declarations: readonly VariableDeclaration[],
  flags?: NodeFlags
): VariableDeclarationList {
  return typescriptFactory.createVariableDeclarationList(declarations, flags);
}

export function createIdentifier(text: string): Identifier {
  return typescriptFactory.createIdentifier(text);
}

export function createNumericLiteral(
  value: string | number,
  numericLiteralFlags?: TokenFlags
): NumericLiteral {
  return typescriptFactory.createNumericLiteral(value, numericLiteralFlags);
}

export function createArrowFunction(
  block: ts.ConciseBody,
  parameter: ReadonlyArray<ts.ParameterDeclaration> = []
): ts.ArrowFunction {
  return typescriptFactory.createArrowFunction(
    undefined,
    undefined,
    parameter,
    undefined,
    typescriptFactory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    block
  );
}

export function createFunctionExpression(
  block: Block,
  parameter: ReadonlyArray<ParameterDeclaration> = []
): FunctionExpression {
  return typescriptFactory.createFunctionExpression(
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
  const block: Block = typescriptFactory.createBlock([
    typescriptFactory.createReturnStatement(descriptorToReturn),
  ]);

  return typescriptFactory.createFunctionExpression(
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
  return typescriptFactory.createBlock(statements, multiLine);
}

export function createReturnStatement(
  expression?: Expression
): ReturnStatement {
  return typescriptFactory.createReturnStatement(expression);
}

export function createCall(
  expression: Expression,
  argumentExpressions: Expression[]
): CallExpression {
  return typescriptFactory.createCallExpression(
    expression,
    undefined,
    argumentExpressions
  );
}

export function createIIFE(block: Block): CallExpression {
  return createCall(
    typescriptFactory.createParenthesizedExpression(
      typescriptFactory.createFunctionExpression(
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
  return typescriptFactory.createPropertyDeclaration(
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
  return typescriptFactory.createPropertySignature(
    [],
    propertyName,
    undefined,
    type
  );
}

export function createParameter(parameterName: string): ParameterDeclaration {
  return typescriptFactory.createParameterDeclaration(
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
  return typescriptFactory.createParameterDeclaration(
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
      typescriptFactory.createParameterDeclaration(
        undefined,
        undefined,
        undefined,
        parameterName,
        undefined,
        undefined,
        undefined
      )
  );
  return typescriptFactory.createMethodDeclaration(
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
  return typescriptFactory.createVariableDeclaration(
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
  return typescriptFactory.createPropertyAccessExpression(expression, name);
}

export function createSpread(expression: Expression): SpreadElement {
  return typescriptFactory.createSpreadElement(expression);
}

export function createStringLiteral(text: string): StringLiteral {
  return typescriptFactory.createStringLiteral(text);
}

export function createLogicalNot(operand: Expression): PrefixUnaryExpression {
  return typescriptFactory.createLogicalNot(operand);
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

  return typescriptFactory.createBigIntLiteral(type.value);
}

export function createNodeArray<T extends Node>(
  elements?: readonly T[],
  hasTrailingComma?: boolean
): NodeArray<T> {
  return typescriptFactory.createNodeArray(elements, hasTrailingComma);
}

export function createArrayTypeNode(): Node {
  return typescriptFactory.createArrayTypeNode(
    typescriptFactory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
  );
}

export function createTypeNode<TKind extends KeywordTypeSyntaxKind>(
  kind: TKind
): KeywordTypeNode<TKind> {
  return typescriptFactory.createKeywordTypeNode(kind);
}

export function createFunctionTypeNode(typeNode: TypeNode): FunctionTypeNode {
  return typescriptFactory.createFunctionTypeNode([], [], typeNode);
}

export function createNode(): Node {
  return typescriptFactory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
}

export function createObjectLiteral(
  properties?: readonly ObjectLiteralElementLike[],
  multiLine?: boolean
): ObjectLiteralExpression {
  return typescriptFactory.createObjectLiteralExpression(properties, multiLine);
}

export function createBinaryExpression(
  left: Expression,
  operator: BinaryOperator | BinaryOperatorToken,
  right: Expression
): BinaryExpression {
  return typescriptFactory.createBinaryExpression(left, operator, right);
}

export function createPunctuationToken<TKind extends PunctuationSyntaxKind>(
  token: TKind
): PunctuationToken<TKind> {
  return typescriptFactory.createToken(token);
}

export function createIfStatement(
  expression: Expression,
  block: Block
): IfStatement {
  return typescriptFactory.createIfStatement(expression, block, undefined);
}

export function createReturn(expression: Expression): ReturnStatement {
  return typescriptFactory.createReturnStatement(expression);
}

export function createExpressionStatement(
  binaryExpression: Expression
): ExpressionStatement {
  return typescriptFactory.createExpressionStatement(binaryExpression);
}

export function createElementAccessExpression(
  identifier: Identifier,
  literalProperty: StringLiteral
): ElementAccessExpression {
  return typescriptFactory.createElementAccessExpression(
    identifier,
    literalProperty
  );
}

export function createPropertyAssignment(
  name: string | PropertyName,
  expression: ts.Expression
): PropertyAssignment {
  return typescriptFactory.createPropertyAssignment(name, expression);
}

export function createElementAccess(
  expression: Expression,
  index: number | Expression
): ElementAccessExpression {
  return typescriptFactory.createElementAccessExpression(expression, index);
}

export function createConditional(
  condition: Expression,
  questionToken: QuestionToken | undefined,
  whenTrue: Expression,
  colonToken: ColonToken | undefined,
  whenFalse: Expression
): ConditionalExpression {
  return typescriptFactory.createConditionalExpression(
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
  return typescriptFactory.updateSourceFile(node, statements);
}

export function createImportAllAs(
  moduleName,
  filenameToImportFrom
): ImportDeclaration {
  return typescriptFactory.createImportDeclaration(
    [],
    [],
    typescriptFactory.createImportClause(
      false,
      undefined,
      typescriptFactory.createNamespaceImport(moduleName)
    ),
    typescriptFactory.createStringLiteral(filenameToImportFrom)
  );
}

export function createForStatement(
  initializer: Expression | VariableDeclarationList | undefined,
  condition: Expression | undefined,
  incrementor: Expression | undefined,
  statement: Statement
): ForStatement {
  return typescriptFactory.createForStatement(
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
  return typescriptFactory.createPostfixUnaryExpression(operand, operator);
}

export function createEmptyStatement(): EmptyStatement {
  return typescriptFactory.createEmptyStatement();
}

export function createTypeReferenceNode(
  identifier: Identifier
): TypeReferenceNode {
  return typescriptFactory.createTypeReferenceNode(identifier, undefined);
}

export function createNew(expression: Expression): Expression {
  return typescriptFactory.createNewExpression(
    expression,
    undefined,
    undefined
  );
}

export function createNull(): NullLiteral {
  return typescriptFactory.createNull();
}

export function createTypeQueryNode(identifier: Identifier): TypeQueryNode {
  return typescriptFactory.createTypeQueryNode(identifier);
}

export function createTypeLiteralNode(
  typeElements: readonly TypeElement[]
): TypeLiteralNode {
  return typescriptFactory.createTypeLiteralNode(typeElements);
}
