import { createMock, Mock } from "ts-auto-mock";

describe('tsLib ', () => {
	it('should return an unknown spy', () => {
		interface Interface {
			a: Function;
		}
		
		const mock: Mock<Interface> = createMock<Interface>();
		
		expect(mock.a.and.identity).toBe("unknown");
		
		mock.a();
		expect(mock.a).toHaveBeenCalledWith();
	});
});
