import * as ts from 'typescript';
import { Scope } from '../../scope/scope';
import { GetDescriptor } from '../descriptor';

export function GetTupleDescriptor(
  node: ts.TupleTypeNode,
  scope: Scope
): ts.Expression {
  return ts.createArrayLiteral(
    node.elements.map((e: ts.TypeNode) => GetDescriptor(e, scope))
  );
}
