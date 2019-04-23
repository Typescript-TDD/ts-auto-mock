import { createMock } from 'ts-auto-mock';

describe('when assigned directly', () => {
    describe('return number', () => {
        class MyClass {
            public value: 2;
        }

        it('should return the number', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toBe(2);
        });
    });

    describe('return string', () => {
        class MyClass {
            public value: 'valueString';
        }

        it('should set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toBe('valueString');
        });
    });

    describe('return false', () => {
        class MyClass {
            public value: false;
        }

        it('should set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toBe(false);
        });
    });

    describe('return true', () => {
        class MyClass {
            public value: true;
        }

        it('should set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toBe(true);
        });
    });

    describe('return object', () => {
        class MyClass {
            // tslint:disable-next-line
            public value = {};
        }

        it('should set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toEqual({});
        });
    });

    describe('return object with properties', () => {
        class MyClass {
            // tslint:disable-next-line
            public value = {
                a: 2,
                b: false,
                c: 'test',
            };
        }

        it('should set the value', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.value).toEqual({
                a: 2,
                b: false,
                c: 'test',
            });
        });
    });
});
