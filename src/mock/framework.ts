import { Mock, MockMethod } from "ts-auto-mock";

function Mock<U>(mock: Mock<U>): AutoMockExtensionHandler<U> {
	return new AutoMockExtensionHandler(mock);
}

export const On = {
	Mock: Mock
};

class AutoMockExtensionHandler<U> {
	private readonly _mock: Mock<U>;
	
	constructor(mock: Mock<U>) {
		this._mock = mock;
	}
	
	get<R>(extension: Extension<U, R>): R {
		return extension(this._mock);
	}
}

export type Extension<TMock, TMocked> = (mock: TMock) => TMocked;

type FunctionReturn<TR> = () => TR;

export function mockedMethod<T extends FunctionReturn<TR> | Function, TR, U>(cb: (mock: U) => T): Extension<U, MockMethod<TR>> {
	return cb as unknown as (mock: U) => MockMethod<TR>;
}