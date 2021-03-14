import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';
import { createArrayLiteral } from '../../../typescriptFactory/typescriptFactory';

export function GetTupleDescriptor(
  node: ts.TupleTypeNode,
  scope: Scope
): ts.Expression {
  return createArrayLiteral(
    getDescriptorFromTypeNodes(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((node as any).elementTypes as ts.NodeArray<ts.TypeNode>) ||
        // Typescript 4 doesn't have elementTypes but it does have elements, to support both versions
        // this casting is needed.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((node as any).elements as ts.NodeArray<ts.TypeNode>),
      scope
    )
  );
}

function getDescriptorFromTypeNodes(
  nodes: ts.NodeArray<ts.TypeNode>,
  scope: Scope
): ts.Expression[] {
  return nodes.map((e: ts.TypeNode) => GetDescriptor(e, scope));
}
