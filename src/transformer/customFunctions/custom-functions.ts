import { CustomFunction } from '../matcher/matcher';
import { createHydratedMockCustomFunction } from './create-hydrated-mock';
import { createMockCustomFunction } from './create-mock';
import { createMockListCustomFunction } from './create-mock-list';
import { registerMockCustomFunction } from './register-mock';

export const customFunctions: CustomFunction[] = [
  createMockCustomFunction,
  createMockListCustomFunction,
  registerMockCustomFunction,
  createHydratedMockCustomFunction,
];
