import { createMock } from "../../../src/transformer/create-mock";

describe('for generic', () => {
    describe('interfaces', () => {
        interface WithGeneric<T>{
            iAmAString: T
        }

        interface WithGenerics<T, S>{
            iAmAString: T
            iAmANumber: S
        }

        interface WithGenericsSub<T> {
            sub: WithGeneric<string>;
            iAmAString: T;
        }

        interface WithGenericsSubInterface<T> {
            sub: WithGeneric<T>;
        }

        it('should set the value of the generic', () => {
            const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics', () => {
            const properties: WithGenerics<string, number> = createMock<WithGenerics<string, number>>();
            expect(properties.iAmANumber).toBe(0);
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the sub generics', () => {
            const properties: WithGenericsSub<string> = createMock<WithGenericsSub<string>>();
            expect(properties.sub.iAmAString).toBe("");
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics with sub interfaces', () => {
            const properties: WithGenericsSubInterface<string> = createMock<WithGenericsSubInterface<string>>();
            expect(properties.sub.iAmAString).toBe("");
        });
    });

    describe('classes', () => {
        class WithGeneric<T>{
            iAmAString: T
        }

        class WithGenerics<T, S> {
            iAmAString: T;
            iAmANumber: S
        }

        class WithGenericsSub<T> {
            sub: WithGeneric<string>;
            iAmAString: T;
        }

        class WithGenericsSubInterface<T> {
            sub: WithGeneric<T>;
        }

        it('should set the value of the generic', () => {
            const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics', () => {
            const properties: WithGenerics<string, number> = createMock<WithGenerics<string, number>>();
            expect(properties.iAmANumber).toBe(0);
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the sub generics', () => {
            const properties: WithGenericsSub<string> = createMock<WithGenericsSub<string>>();
            expect(properties.sub.iAmAString).toBe("");
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics with sub interfaces', () => {
            const properties: WithGenericsSubInterface<string> = createMock<WithGenericsSubInterface<string>>();
            expect(properties.sub.iAmAString).toBe("");
        });
    });

    describe('types', () => {
        type WithGeneric<T> = {
            iAmAString: T
        }

        type WithGenerics<T, S> = {
            iAmAString: T;
            iAmANumber: S
        }

        type WithGenericsSub<T> = {
            sub: WithGeneric<string>;
            iAmAString: T;
        }

        type WithGenericsSubInterface<T> = {
            sub: WithGeneric<T>;
        }

        it('should set the value of the generic', () => {
            const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics', () => {
            const properties: WithGenerics<string, number> = createMock<WithGenerics<string, number>>();
            expect(properties.iAmANumber).toBe(0);
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the sub generics', () => {
            const properties: WithGenericsSub<string> = createMock<WithGenericsSub<string>>();
            expect(properties.sub.iAmAString).toBe("");
            expect(properties.iAmAString).toBe("");
        });

        it('should set all the generics with sub interfaces', () => {
            const properties: WithGenericsSubInterface<string> = createMock<WithGenericsSubInterface<string>>();
            expect(properties.sub.iAmAString).toBe("");
        });
    });
});