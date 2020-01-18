export class FakePromise<T> {
  public readonly [Symbol.toStringTag]: string;
  private _promise: Promise<T>;
  private _res: (t: T) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _rej: (e: any) => void;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/typedef
    this._promise = new Promise((res, rej) => {
      this._res = res;
      this._rej = rej;
    });
  }

  public resolve(t: T): void {
    this._res(t);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public reject(t: any): void {
    this._rej(t);
  }

  public then<T2>(t: (tt: T) => (T2 | Promise<T2>)): Promise<T2> {
    return this._promise.then(t);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public catch<T2>(t: any): Promise<T | T2> {
    return this._promise.catch(t);
  }

  public finally(): Promise<T> {
    return this._promise.finally();
  }
}
