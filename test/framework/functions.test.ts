import { createMock, method, On } from "ts-auto-mock";

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
			On(mock).get(method(x => x.apply))
		}).toThrow();
	});

	it('should create different factories for different functions mock', () => {
		interface Mock {
			first: Function;
			second: Function;
		}
		const mock: Mock = createMock<Mock>();

		expect((mock.first as jasmine.Spy).and.identity).toBe('first');
		expect((mock.second as jasmine.Spy).and.identity).toBe('second');
	});
});
