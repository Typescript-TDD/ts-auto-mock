import { createMock } from 'ts-auto-mock';

describe('interface without properties and with methods', () => {
    it('should assign the first method', () => {
        interface A {
            // tslint:disable-next-line
            (): string;
        }

        interface B {
            // tslint:disable-next-line
            (): number;
        }

        interface C {
            prop: A & B;
        }

        const mock: C = createMock<C>();

        expect(mock.prop()).toBe('');
    });
});
