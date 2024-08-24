// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type Factory = Function;

export class Repository {
  private readonly _repository: { [key: string]: Factory };

  private constructor() {
    this._repository = {};
  }

  private static _instance: Repository;

  public static get instance(): Repository {
    this._instance = this._instance || new Repository();
    return this._instance;
  }

  public registerFactory(key: string, factory: Factory): void {
    this._repository[key] = factory;
  }

  public getFactory(key: string): Factory {
    return this._repository[key];
  }
}
