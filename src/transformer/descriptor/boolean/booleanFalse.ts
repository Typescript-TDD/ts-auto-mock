import type * as ts from 'typescript';
import {
  createLogicalNot,
  createNumericLiteral,
} from '../../../typescriptFactory/typescriptFactory';

export function GetBooleanFalseDescriptor(): ts.Expression {
  return createLogicalNot(createNumericLiteral(1));
}
