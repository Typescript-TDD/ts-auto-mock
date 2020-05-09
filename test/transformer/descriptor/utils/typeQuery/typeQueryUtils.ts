export declare function exportedDeclaredFunction(): string;

export declare function exportedDeclaredOverloadedFunction(a: boolean, b: boolean, c: number): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: boolean, c: string): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: number, c: number): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: number, c: string): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: string, c: number): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: string, c: string): boolean;
export declare function exportedDeclaredOverloadedFunction(a: number, b: boolean, c: boolean): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: boolean, c: string): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: number, c: boolean): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: number, c: string): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: string, c: boolean): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: string, c: string): number;
export declare function exportedDeclaredOverloadedFunction(a: string, b: boolean, c: boolean): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: boolean, c: number): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: number, c: boolean): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: number, c: number): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: string, c: boolean): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: string, c: number): string;
export declare function exportedDeclaredOverloadedFunction(a: number, b: number, c: number): number;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: boolean, c: boolean): boolean;
export declare function exportedDeclaredOverloadedFunction(a: string, b: string, c: string): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: number, c: string): string;
export declare function exportedDeclaredOverloadedFunction(a: string, b: boolean, c: string): string;
export declare function exportedDeclaredOverloadedFunction(a: number, b: string, c: number): number;
export declare function exportedDeclaredOverloadedFunction(a: number, b: boolean, c: number): number;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: number, c: boolean): boolean;
export declare function exportedDeclaredOverloadedFunction(a: boolean, b: string, c: boolean): boolean;

export declare function exportedDeclaredOverloadedFunction(a: string | number | boolean, b: string | number | boolean, c: string | number | boolean): string | number | boolean;

export declare function exportedDeclaredOverloadedFunction(a: ExportedDeclaredClass): ExportedClass;
export declare function exportedDeclaredOverloadedFunction(a: boolean): boolean;
export declare function exportedDeclaredOverloadedFunction(a: number): number;
export declare function exportedDeclaredOverloadedFunction(a: string): string;

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
