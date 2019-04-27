import { ModuleName } from './moduleName';

export enum ModuleImportUrl {
    Repository = 'ts-auto-mock/repository',
    Extension = 'ts-auto-mock/extension',
}

export const ModulesImportUrl: {[key in ModuleName]: ModuleImportUrl } = {
    Repository: ModuleImportUrl.Repository,
    Extension: ModuleImportUrl.Extension,
};
