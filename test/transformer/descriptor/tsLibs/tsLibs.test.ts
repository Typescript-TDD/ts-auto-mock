import { createMock } from 'ts-auto-mock';

describe('typescript lib', () => {
    it('should set an empty array', () => {
        interface Interface {
            // tslint:disable-next-line
            a: Array<boolean>;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual([]);
    });

    it('should set the default value for a number', () => {
        interface Interface {
            a: Number;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe(0);
    });

    it('should set the default value for a string', () => {
        interface Interface {
            a: String;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe('');
    });

    it('should set the default value for a boolean', () => {
        interface Interface {
            a: Boolean;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBe(false);
    });

    it('should set the default value for empty object', () => {
        interface Interface {
            a: object;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual({});
    });

    it('should set an empty function for a function', () => {
        interface Interface {
            a: Function;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a()).toBeUndefined();
    });

    it('should set an empty array for a ReadOnlyArray', () => {
        interface Interface {
            a: ReadonlyArray<boolean>;
        }
        const properties: Interface = createMock<Interface>();
        expect(properties.a).toEqual([]);
    });

    it('should set undefined for a Date', () => {
        interface Interface {
            a: Date;
        }

        const properties: Interface = createMock<Interface>();
        expect(properties.a).toBeUndefined();
    });

    it('should set a promise resolved for a promise', async () => {
        interface Interface {
            a(): Promise<string>;
        }

        const properties: Interface = createMock<Interface>();

        const interfaceCast: Interface = properties as unknown as Interface;

        const result: string = await interfaceCast.a();
        expect(result).toBe('');
    });

    it('should set a promise resolved for a promise wit array', async () => {
        interface Interface {
            a(): Promise<string[]>;
        }

        const properties: Interface = createMock<Interface>();

        const interfaceCast: Interface = properties as unknown as Interface;

        const result: Array<string> = await interfaceCast.a();
        expect(result).toEqual([]);
    });

    it('should set a promise resolved for a promise with more generics', async () => {
        interface WithGenerics<T> {
            generic: T;
        }
        interface Interface {
            a(): Promise<WithGenerics<string>>;
        }

        const properties: Interface = createMock<Interface>();

        const interfaceCast: Interface = properties as unknown as Interface;

        const result: WithGenerics<string> = await interfaceCast.a();
        expect(result).toEqual({
            generic: '',
        });
    });

    it('should set a promise resolved for a promise with more promise', async () => {
        interface WithGenerics {
            generic(): Promise<number>;
        }

        interface Interface {
            a(): Promise<WithGenerics>;
        }

        const properties: Interface = createMock<Interface>();
        const interfaceCast: Interface = properties as unknown as Interface;
        const result: WithGenerics = await interfaceCast.a();
        const secondPromise: number = await result.generic();

        expect(secondPromise).toBe(0);
    });

    it('should set a promise resolved for a promise with more promise with generics', async () => {
        interface WithGenerics<T> {
            generic(): Promise<T>;
            generic2(): Promise<number>;
        }

        interface Interface {
            a(): Promise<WithGenerics<string>>;
        }

        const properties: Interface = createMock<Interface>();
        const interfaceCast: Interface = properties as unknown as Interface;
        const result: WithGenerics<string> = await interfaceCast.a();
        const secondPromise: string = await result.generic();
        const secondPromise2: number = await result.generic2();

        expect(secondPromise).toBe('');
        expect(secondPromise2).toBe(0);
    });
});
