export let MultipleInterfaceDeclaration: MultipleInterfaceDeclaration;

export interface MultipleInterfaceDeclaration {
  a: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class MultipleClassDeclaration {
  public a: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class MultipleClassDeclaration {
  public a: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type MultipleTypeDeclaration = {
  a: string;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type MultipleTypeDeclaration = {
  a: boolean;
};

// eslint-disable-next-line no-var
export var MultipleLiteralTypeDeclaration: MultipleLiteralTypeDeclaration;
export type MultipleLiteralTypeDeclaration = 'string';
