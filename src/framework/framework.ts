import { MockMarker } from "../mockMarker/mockMarker";
import { MockMethod } from "../mockMethod/mockMethod";

function Mock<U extends object>(mock: U): AutoMockExtensionHandler<U> {
	// @ts-ignore
	if (!mock[MockMarker.instance.get()]) {
		throw new Error("The provided mock is not valid. Please create a mock first with createMock")
	}
	
	return new AutoMockExtensionHandler(mock);
}

type FunctionReturn<TR> = () => TR;

export const On = {
	Mock: Mock
};

export class AutoMockExtensionHandler<U> {
	private readonly _mock: U;
	
	constructor(mock: U) {
		this._mock = mock;
	}
	
	get<R>(extension: Extension<U, R>): R {
		return extension(this._mock);
	}
}

export type Extension<TMock, TMocked> = (mock: TMock) => TMocked;

export function mockedMethod<T extends FunctionReturn<TR> | Function, TR, U>(cb: (mock: U) => T): Extension<U, MockMethod<TR>> {
	return cb as unknown as (mock: U) => MockMethod<TR>;
}

