export class Marker {
    private static _instance: Marker;

    public static get instance(): Marker {
        this._instance = this._instance || new Marker();
        return this._instance;
    }

    private readonly _marker: symbol;

    private constructor() {
        this._marker = Symbol('__marker');
    }

    public get(): Symbol {
        return this._marker;
    }
}
