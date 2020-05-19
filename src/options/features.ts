import { GetOptionByKey } from './options';

interface Features {
  transformOverloads: unknown;
}

export type TsAutoMockFeaturesOptions = Array<keyof Features>;

export function GetTsAutoMockFeaturesOptions(): TsAutoMockFeaturesOptions {
  return GetOptionByKey('features');
}
