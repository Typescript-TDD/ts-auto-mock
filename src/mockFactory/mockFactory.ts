// tslint:disable-next-line:no-any
type Factory = (name: string, value: any) => () => any;

export class MockFactory {
    private _factory: Factory;

    private constructor() {
    }

    private static _instance: MockFactory;

    public static get instance(): MockFactory {
        this._instance = this._instance || new MockFactory();
        return this._instance;
    }

    public registerFactory(factory: Factory): void {
        this._factory = factory;
    }

    // tslint:disable-next-line:no-any
    public getFactory(name: string, value: any): Factory {
        this._factory = this._factory || this._defaultFactory;

        return this._factory(name, value);
    }

    // tslint:disable-next-line:no-any
    private _defaultFactory: Factory = (name: string, value: any) => (): any => value;
}
