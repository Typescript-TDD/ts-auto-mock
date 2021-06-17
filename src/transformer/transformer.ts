import * as ts from 'typescript';
import { TsAutoMockOptions } from '../options/options';
import { createHydratedMockCustomFunction } from './customFunctions/create-hydrated-mock';
import { createMockCustomFunction } from './customFunctions/create-mock';
import { createMockListCustomFunction } from './customFunctions/create-mock-list';
import { registerMockCustomFunction } from './customFunctions/register-mock';
import { CustomFunction } from './matcher/matcher';
import { baseTransformer } from './base/base';

const customFunctions: CustomFunction[] = [
  createMockCustomFunction,
  createMockListCustomFunction,
  registerMockCustomFunction,
  createHydratedMockCustomFunction,
];

const transformer: (
  program: ts.Program,
  options?: TsAutoMockOptions
) => ts.TransformerFactory<ts.SourceFile> = baseTransformer(customFunctions);

export { transformer };
