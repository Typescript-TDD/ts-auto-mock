import { createMock, mockedMethod, On } from "ts-auto-mock";

describe('functions', () => {
	type a = () => void;
	let mock: a;
	
	beforeEach(() => {
		mock = createMock<a>();
	});
	
	it('should work as a spy', () => {
		function hello(a: a) {
			a();
		}
		
		hello(mock);
		expect(mock).toHaveBeenCalled();
	});
	
	it('should not be able to get the mock', () => {
		expect(() => {
			On.Mock(mock).get(mockedMethod(x => x.apply))
		}).toThrow();
	});
});
