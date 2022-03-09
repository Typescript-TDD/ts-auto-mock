import * as ts from 'typescript';
import { CustomFunction } from '../../../src/transformer/matcher/matcher';
import { baseTransformer } from '../../../src/transformer/base/base';
import { createDefinitelyTypedMockCustomFunction } from './customFunctions/create-definitely-typed-mock';

const customFunctions: CustomFunction[] = [
  createDefinitelyTypedMockCustomFunction,
];

const transformer = baseTransformer(customFunctions, ts);
export { transformer };
