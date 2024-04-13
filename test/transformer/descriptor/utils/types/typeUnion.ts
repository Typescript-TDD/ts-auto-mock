export type TypeUnion = '1' | '2' | 'a' | 'b';
export type TypeUnionWithNegatives = -1 | -2 | 3 | 2;
export type TypeUnionToken = 'a' | 'b';
export type TypeUnionTokenNumber = 1 | 1;
export type TypeUnionTokenSameBoolean = true | true;
export type TypeUnionTokenAllBoolean = true | false;
export type TypeUnionObject = { a: string } | { b: string };
export type TypeUnionFunction = () => void | string;
export type TypeUnionEmptyObject = {} | {};
