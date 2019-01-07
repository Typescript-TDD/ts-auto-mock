export interface Test {
  property: string;
  a: () => void;
  // a2: () => Test2;
  a3: () => () => void;
  // a4: () => TestFunction;
  // a5: () => TestFunction2;
  a6: () => string;
  a7: () => number;
  a8: () => boolean;
  a9: number;
  a10: boolean;
  a11: any;
}
