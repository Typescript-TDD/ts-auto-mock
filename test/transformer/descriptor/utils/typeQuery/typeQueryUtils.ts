export declare function exportedDeclaredFunction(): string;

export declare class ExportedDeclaredClass {
  public prop: string;
}

export function exportedFunction(): number { return 3; }

export class ExportedClass {
  public prop: number;
}

export enum ExportedEnum {
  A,
  B = 'B',
  C = 'MaybeC'
}

export type WrapExportedEnum = typeof ExportedEnum;
export type WrapExportedClass = typeof ExportedClass;
