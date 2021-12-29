import type * as ts from 'typescript';
import {
  createLogicalNot,
  createNumericLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetBooleanTrueDescriptor(): ts.Expression {
  return createLogicalNot(createNumericLiteral(0));
}
