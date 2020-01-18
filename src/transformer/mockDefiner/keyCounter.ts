export class KeyCounter {
  private _keyCounters: Map<string, number>;

  constructor() {
    this._keyCounters = new Map();
  }

  public getFor(name: string): number {
    const count: number = this._keyCounters.get(name) || 1;
    this._keyCounters.set(name, count + 1);

    return count;
  }
}
