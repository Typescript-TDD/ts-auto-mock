// eslint-disable-next-line
type Factory = (...args: any[]) => any;

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
    const proxy: Factory = new Proxy(
      factory,
      {
        apply(target: Factory, _this: unknown, args: Parameters<Factory>): ReturnType<Factory> {
          const mock: ReturnType<Factory> = target(...args);

          if (typeof mock === 'undefined') {
            return;
          }

          if (!(mock instanceof Object)) {
            return mock;
          }

          if (typeof mock.__factory !== 'undefined') {
            return mock;
          }

          Object.defineProperty(mock, '__factory', {
            enumerable: false,
            writable: false,
            value: key,
          });

          return mock;
        },
      },
    );

    this._repository[key] = proxy;
  }

  public getFactory(key: string): Factory {
    return this._repository[key];
  }
}
