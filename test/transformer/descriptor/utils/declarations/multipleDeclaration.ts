export let MultipleInterfaceDeclaration: MultipleInterfaceDeclaration;

export interface MultipleInterfaceDeclaration {
    a: string;
}

// @ts-ignore
export class MultipleClassDeclaration {
    public a: string;
}

// @ts-ignore
export class MultipleClassDeclaration {
    public a: boolean;
}

// tslint:disable
// @ts-ignore
export type MultipleTypeDeclaration = {
    a: string;
}

// @ts-ignore
export type MultipleTypeDeclaration = {
    a: boolean;
}

export var MultipleLiteralTypeDeclaration: MultipleLiteralTypeDeclaration;
export type MultipleLiteralTypeDeclaration = "string";
