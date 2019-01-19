import { createMock } from "ts-auto-mock";

describe('for generic', () => {
    describe('interfaces', () => {
        interface WithGeneric<T>{
            iAmAString: T
        }

        interface WithGenericObject<T>{
            iAmAnObject: T
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

        it('should set all the generics declared inline ', () => {
            const properties: WithGenericObject<{a: string}> = createMock<WithGenericObject<{a: string}>>();
            expect(properties.iAmAnObject.a).toBe("");
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

    describe('with default', () => {
        interface WithGeneric<T = number>{
            generic: T
        }

        interface WithGeneric2<T = number>{
            generic: T
        }

        it('should work when provided', () => {
            const properties: WithGeneric<string> = createMock<WithGeneric<string>>();
            expect(properties.generic).toBe("")
        });

        it('should work when not provided', () => {
            const properties: WithGeneric2 = createMock<WithGeneric2>();
            expect(properties.generic).toBe(0)
        });
    });
});