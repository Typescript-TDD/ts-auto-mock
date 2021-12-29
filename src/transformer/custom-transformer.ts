import type * as ts from 'typescript';
import { TsAutoMockOptions } from '../options/options';
import { baseTransformer } from './base/base';
import { customFunctions } from './customFunctions/custom-functions';

interface CustomTransformerConfig {
  transformerOptions?: Partial<TsAutoMockOptions>;
  typescript: typeof ts;
}

export const customTransformer: (
  program: ts.Program,
  config: CustomTransformerConfig
) => ts.TransformerFactory<ts.SourceFile> = (
  program: ts.Program,
  config: CustomTransformerConfig
) =>
  baseTransformer(customFunctions, config.typescript)(
    program,
    config.transformerOptions
  );
