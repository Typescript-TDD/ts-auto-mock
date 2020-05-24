import { GetOptionByKey } from './options';

export function IsTsAutoMockRandomEnabled(): boolean {
  return GetOptionByKey('features').includes('random');
}
