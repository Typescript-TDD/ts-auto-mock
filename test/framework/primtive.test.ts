import { createMock, mockedMethod, On } from "ts-auto-mock";

describe('primitives', () => {
	type a = string;
	let mock: a;
	
	beforeEach(() => {
		// @ts-ignore
		mock = createMock<a>();
	});
	
	it('should not be able to get the mock', () => {
		expect(() => {
			// @ts-ignore
			On.Mock(mock).get(mockedMethod(x => x.apply))
		}).toThrow();
	});
});
