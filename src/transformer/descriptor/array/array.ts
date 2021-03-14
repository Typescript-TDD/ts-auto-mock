import * as ts from 'typescript';
import { createArrayLiteral } from '../../../typescriptFactory/typescriptFactory';

export function GetArrayDescriptor(): ts.Expression {
  return createArrayLiteral();
}
