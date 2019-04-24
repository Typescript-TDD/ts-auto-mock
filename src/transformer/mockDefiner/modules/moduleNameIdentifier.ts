import * as ts from 'typescript';
import { ModuleName } from './moduleName';
import { ModuleImportUrl } from './modulesImportUrl';

export interface ModuleNameIdentifier {
    name: ModuleName;
    moduleUrl: ModuleImportUrl;
    identifier: ts.Identifier;
}
