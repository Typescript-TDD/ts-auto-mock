import * as ts from 'typescript';
import { createNull } from '../../../typescriptFactory/typescriptFactory';

export function GetNullDescriptor(): ts.Expression {
  return createNull();
}
