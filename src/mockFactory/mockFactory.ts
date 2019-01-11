type Factory = Function;

export class MockFactory {
    private static _instance: MockFactory;
    private _factory: Factory;

    private _defaultFactory = (data) => () => data;

    private constructor() {}

    public static get instance(): MockFactory {
        this._instance = this._instance || new MockFactory();
        return this._instance;
    }

    public registerFactory(factory: Factory): void {
        this._factory = factory;
    }

    public getFactory(data: any): Factory {
        this._factory = this._factory || this._defaultFactory;
        
        return this._factory(data);
    }
}