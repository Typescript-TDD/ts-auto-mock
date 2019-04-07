export class MockMarker {
    private static _instance: MockMarker;

    public static get instance(): MockMarker {
        this._instance = this._instance || new MockMarker();
        return this._instance;
    }

    private readonly _mockMarker: symbol;

    private constructor() {
        this._mockMarker = Symbol('__mockMarker');
    }

    public get(): Symbol {
        return this._mockMarker;
    }
}
