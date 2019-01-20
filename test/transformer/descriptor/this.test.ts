import { createMock } from "ts-auto-mock";

describe('for this', () => {
	class BasicCalculator {
		public test: this;
		public method(): number {
			return 2;
		}
	}

	it('should set the property correctly', () => {
		const properties: BasicCalculator = createMock<BasicCalculator>();
		expect(properties.test.method()).toBe(0);
	});
});