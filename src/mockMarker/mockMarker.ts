export class MockMarker {
	private static _instance: MockMarker;
	private readonly _mockMarker: Symbol;
	
	private constructor() {
		this._mockMarker = Symbol("__mockMarker");
	}
	
	public static get instance(): MockMarker {
		this._instance = this._instance || new MockMarker();
		return this._instance;
	}
	
	public get(): Symbol {
		return this._mockMarker;
	}
}