import * as ts from 'typescript';
import { TsAutoMockOptions } from '../options/options';
import { baseTransformer } from './base/base';
import { customFunctions } from './customFunctions/custom-functions';

export const transformer: (
  program: ts.Program,
  options?: Partial<TsAutoMockOptions>,
) => ts.TransformerFactory<ts.SourceFile> = baseTransformer(
  customFunctions,
  ts,
);
