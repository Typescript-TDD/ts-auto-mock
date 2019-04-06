import {MockMarker} from "../mockMarker/mockMarker";
import {Extension} from "./extension";

export function On<U extends object>(mock: U): AutoMockExtensionHandler<U> {
	// @ts-ignore
	if (!mock[MockMarker.instance.get()]) {
		throw new Error("The provided mock is not valid. Please create a mock first with createMock")
	}
	
	return new AutoMockExtensionHandler(mock);
}

export class AutoMockExtensionHandler<TMock> {
	private readonly _mock: TMock;
	
	constructor(mock: TMock) {
		this._mock = mock;
	}
	
	get<TRequestedOverriddenMock>(extension: Extension<TMock, TRequestedOverriddenMock>): TRequestedOverriddenMock {
		return extension(this._mock);
	}
}
