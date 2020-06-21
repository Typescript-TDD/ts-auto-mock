import { Interface } from './interface';

export declare function overloadedFunction(a: number): number;
export declare function overloadedFunction(a: string): string;
export declare function overloadedFunction(a: boolean): boolean;
export declare function overloadedFunction(): undefined;
export declare function overloadedFunction(a: Interface): Interface;
