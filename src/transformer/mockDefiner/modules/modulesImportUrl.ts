import { ModuleName } from './moduleName';

export enum ModuleImportUrl {
  Repository = 'ts-auto-mock/repository',
  Extension = 'ts-auto-mock/extension',
  Random = 'ts-auto-mock/random',
  Merge = 'ts-auto-mock/merge',
}

export const ModulesImportUrl: {[key in ModuleName]: ModuleImportUrl } = {
  Repository: ModuleImportUrl.Repository,
  Extension: ModuleImportUrl.Extension,
  Merge: ModuleImportUrl.Merge,
  Random: ModuleImportUrl.Random,
};
