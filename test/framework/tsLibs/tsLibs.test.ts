import { createMock, Mock } from "ts-auto-mock";

describe('tsLib ', () => {
	it('should return a spy with a name', () => {
		interface Interface {
			a: Function;
		}
		
		const mock: Mock<Interface> = createMock<Interface>();
		
		expect(mock.a.and.identity).toBe("a");
		
		mock.a();
		expect(mock.a).toHaveBeenCalledWith();
	});
});
