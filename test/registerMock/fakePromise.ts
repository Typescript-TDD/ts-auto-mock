export class FakePromise<T> {
  public readonly [Symbol.toStringTag]: string;
  private _promise: Promise<T>;
  private _res: (t: T) => void;
  private _rej: (e: any) => void;

  constructor() {
    const that: FakePromise<T> = this;
    this._promise = new Promise(function (res, rej) {
      that._res = res;
      that._rej = rej;
    });
  }

  public resolve(t: T): void {
    this._res(t);
  }

  public reject(t: any): void {
    this._rej(t);
  }

  public then<T2>(t: (tt: T) => (T2 | Promise<T2>)): Promise<T2> {
    return this._promise.then(t);
  }

  public catch<T2>(t: any): Promise<T | T2> {
    return this._promise.catch(t);
  }

  public finally(): Promise<T> {
    return this._promise.finally();
  }
}
