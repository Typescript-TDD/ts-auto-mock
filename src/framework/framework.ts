import { MockMarker } from "../mockMarker/mockMarker";
import { MockMethod } from "../mockMethod/mockMethod";

export function On<U extends object>(mock: U): AutoMockExtensionHandler<U> {
	// @ts-ignore
	if (!mock[MockMarker.instance.get()]) {
		throw new Error("The provided mock is not valid. Please create a mock first with createMock")
	}
	
	return new AutoMockExtensionHandler(mock);
}

type FunctionReturn<TR> = () => TR;

export class AutoMockExtensionHandler<TMock> {
	private readonly _mock: TMock;
	
	constructor(mock: TMock) {
		this._mock = mock;
	}
	
	get<TRequestedOverriddenMock>(extension: FindOverriddenMockStrategy<TMock, TRequestedOverriddenMock>): TRequestedOverriddenMock {
		return extension(this._mock);
	}
}

export type FindOverriddenMockStrategy<TMock, TRequestedOverriddenMock> = (mock: TMock) => TRequestedOverriddenMock;

export function method<TFunctionReturn, TMock>(cb: (mock: TMock) => (FunctionReturn<TFunctionReturn> | Function)): FindOverriddenMockStrategy<TMock, MockMethod<TFunctionReturn>> {
	return cb as unknown as (mock: TMock) => MockMethod<TFunctionReturn>;
}

