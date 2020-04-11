// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function TestFn(): new (...args: any[]) => Test2;

export class Test extends TestFn() {
  public a: number;
}

class Test2 {
  public b: string;
}
