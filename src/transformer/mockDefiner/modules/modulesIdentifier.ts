import * as ts from 'typescript';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';
import { ModuleName } from './moduleName';
import { ModulesImportUrl } from './modulesImportUrl';
import { ModuleNameIdentifier } from './moduleNameIdentifier';

export class ModulesIdentifier {
  private readonly _importsPerFile: {
    [fileName: string]: Array<ModuleNameIdentifier>;
  } = {};

  constructor() {
    this._importsPerFile = {};
  }

  public storeImportsForFile(fileName: string): void {
    if (this._importsPerFile[fileName]) {
      return;
    }

    this._importsPerFile[fileName] = Object.keys(ModulesImportUrl).map(
      (moduleName: ModuleName) => ({
        moduleUrl: ModulesImportUrl[moduleName],
        identifier: PrivateIdentifier(moduleName),
      })
    );
  }

  public getImportsPerFile(fileName: string): Array<ModuleNameIdentifier> {
    return this._importsPerFile[fileName] || [];
  }

  public getModuleIdentifier(module: ModuleName): ts.Identifier {
    return PrivateIdentifier(module);
  }
}
