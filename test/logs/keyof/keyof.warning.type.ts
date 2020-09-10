interface MyInterface {
  a: string;
  b: string;
}

export interface KeyOfType {
  prop: keyof MyInterface;
}
