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

// @ts-ignore
export type MultipleTypeDeclaration = {
  a: string;
};

// @ts-ignore
export type MultipleTypeDeclaration = {
  a: boolean;
};

// eslint-disable-next-line no-var
export var MultipleLiteralTypeDeclaration: MultipleLiteralTypeDeclaration;
export type MultipleLiteralTypeDeclaration = 'string';
