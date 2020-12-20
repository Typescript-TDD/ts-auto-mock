import * as ts from 'typescript';
import { createImportOnIdentifier } from '../../helper/import';
import { PrivateIdentifier } from '../../privateIdentifier/privateIdentifier';
import { ModuleNameIdentifier } from './moduleNameIdentifier';
import { ModulesImportUrl } from './modulesImportUrl';
import { ModuleName } from './moduleName';

export class ModuleImportIdentifierPerFile {
  private _modules: {
    [fileName: string]: Array<ModuleNameIdentifier>;
  } = {};

  private _modulesNameIdentifierPerFile: {
    [fileName: string]: { [key in ModuleName]: ts.Identifier };
  } = {};

  public has(fileName: string): boolean {
    return !!this._modules[fileName];
  }

  public set(fileName: string): void {
    this._modulesNameIdentifierPerFile[fileName] = {
      [ModuleName.Extension]: PrivateIdentifier(ModuleName.Extension),
      [ModuleName.Merge]: PrivateIdentifier(ModuleName.Merge),
      [ModuleName.Repository]: PrivateIdentifier(ModuleName.Repository),
      [ModuleName.Random]: PrivateIdentifier(ModuleName.Random),
    };

    this._modules[fileName] = Object.keys(ModulesImportUrl).map(
      (key: ModuleName) => ({
        moduleUrl: ModulesImportUrl[key],
        identifier: this._modulesNameIdentifierPerFile[fileName][key],
      })
    );
  }

  public getModule(fileName: string, moduleName: ModuleName): ts.Identifier {
    return this._modulesNameIdentifierPerFile[fileName][moduleName];
  }

  public get(fileName: string): ts.Statement[] {
    return this._modules[
      fileName
    ].map((moduleIdentifier: ModuleNameIdentifier) =>
      createImportOnIdentifier(
        moduleIdentifier.moduleUrl,
        moduleIdentifier.identifier
      )
    );
  }
}
