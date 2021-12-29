import type * as ts from 'typescript';
import micromatch from 'micromatch';
import { GetOptionByKey } from './options';

export type TsAutoMockFilesOption = string | string[] | undefined;

export function GetIsFilesExcludedFromOptions(): (
  sourceFile: ts.SourceFile
) => boolean {
  const filesOption: string | string[] | undefined = GetOptionByKey('files');

  if (!filesOption) {
    return (_: ts.SourceFile): boolean => false;
  }

  return (file: ts.SourceFile): boolean =>
    !micromatch.isMatch(file.fileName, filesOption);
}
