import { createMock } from 'ts-auto-mock';

describe('with generic', () => {
    class ToExtend<T = string> {
        public test: ToExtend<T>;
    }

    class BasicCalculator<T> {
        public test2: BasicCalculator<T>;
        public b: T;
    }

    it('should be able to reference to itself', () => {
        const properties: BasicCalculator<string> = createMock<BasicCalculator<string>>();
        expect(properties.test2.b).toBe('');
    });
});
