import type * as ts from 'typescript';
import { TypescriptHelper } from '../../descriptor/helper/helper';

export function assertTypeArgumentPresence(
  node: ts.CallExpression,
): asserts node is ts.CallExpression & {
  typeArguments: ts.NodeArray<ts.TypeNode>;
} {
  if (!TypescriptHelper.hasTypeArguments(node)) {
    const mockFunction: string = node.getText();

    throw new Error(
      `It seems you've called \`${mockFunction}' without specifying a type argument to mock. 
          Please refer to the documentation on how to use \`${mockFunction}': 
          https://github.com/Typescript-TDD/ts-auto-mock#quick-overview`,
    );
  }
}
