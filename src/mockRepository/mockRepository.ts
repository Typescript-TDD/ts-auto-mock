type Factory = Function;

export class MockRepository {
    private _repository: { [key: string]: Factory };

    private constructor() {
        this._repository = {};
    }

    private static _instance: MockRepository;

    public static get instance(): MockRepository {
        this._instance = this._instance || new MockRepository();
        return this._instance;
    }

    public registerFactory(key: string, factory: Factory): void {
        this._repository[key] = factory;
    }

    public getFactory(key: string): Factory {
        return this._repository[key];
    }
}
