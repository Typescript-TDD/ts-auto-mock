import { createMock, Mock, mockedMethod, On } from "ts-auto-mock";

describe('tsLib ', () => {
	it('should return a spy with a name', () => {
		interface Interface {
			a: Function;
		}
		
		const mock: Mock<Interface> = createMock<Interface>();
		const spy = On.Mock(mock).get(mockedMethod(x => x.a));
		
		expect(spy.and.identity).toBe("a");
		
		mock.a();
		expect(mock.a).toHaveBeenCalledWith();
	});
});
