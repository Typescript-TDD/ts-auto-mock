import { createMock } from 'ts-auto-mock';
import { InterfaceRecursive } from '../utils/interfaces/recursive';

describe('recursive', () => {
    interface Interface {
        a: number;
        b: Interface;
    }

    interface InterfaceInternal {
        a: string;
        b: Interface;
    }

    it('should not fail for simple recursive', () => {
        const mock: Interface = createMock<Interface>();
        expect(mock.a).toBe(0);
        expect(mock.b.a).toBe(0);
        expect(mock.b.b.b.b.b.a).toBe(0);
    });

    it('should not fail for internal recursive', () => {
        const mock: InterfaceInternal = createMock<InterfaceInternal>();
        expect(mock.a).toBe('');
        expect(mock.b.a).toBe(0);
        expect(mock.b.b.b.b.b.a).toBe(0);
    });

    it('should not fail for imported recursive', () => {
        const mock: InterfaceRecursive = createMock<InterfaceRecursive>();
        expect(mock.a).toBe(false);
        expect(mock.b.a).toBe(false);
        expect(mock.b.b.b.b.b.a).toBe(false);
    });

    describe('with extends', () => {
        interface BasicCalculator extends UiCalculator {
            a: string;
        }

        interface UiCalculator {
            method(): Promise<BasicCalculator>;
            b: string;
        }

        it('should be able to reference to itself ', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.b).toBe('');
        });
    });
});
