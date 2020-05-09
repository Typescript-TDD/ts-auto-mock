import { GetOptionByKey } from './options';

export function IsTsAutoMockOverloadsEnabled(): boolean {
  return GetOptionByKey('features').includes('overloads');
}
