import * as ts from 'typescript';
import { createVoidZero } from '../../../typescriptFactory/typescriptFactory';

export function GetUndefinedDescriptor(): ts.Expression {
  return createVoidZero();
}
