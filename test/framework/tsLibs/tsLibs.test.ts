import { createMock, method, On } from "ts-auto-mock";

describe('tsLib', () => {
	it('should return a spy with a name', () => {
		interface Interface {
			a: Function;
		}
		
		const mock: Interface = createMock<Interface>();
		const spy = On(mock).get(method(x => x.a));

		expect(spy.and.identity).toBe("a");
		
		mock.a();
		expect(mock.a).toHaveBeenCalledWith();
	});
});
