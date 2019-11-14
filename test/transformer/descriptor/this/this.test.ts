import { createMock } from 'ts-auto-mock';

describe('This', () => {
    describe('for class properties', () => {
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

    describe('for class methods', () => {
        class BasicCalculator {
            public value: number;
            public method(): this {
                return this;
            }
        }

        it('should be able to reference to itself ', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.method().method().value).toBe(0);
        });
    });

    describe('for implements class', () => {
        class ToImplement {
            public propThis: this;
        }

        class BasicCalculator implements ToImplement {
            public propThis: this;
            public prop: string;
        }

        it('should be able to reference to itself', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.propThis.prop).toBe('');
            expect(properties.propThis.propThis.prop).toBe('');
        });
    });

    describe('for extend class', () => {
        class ToImplement {
            public propThis: this;
            public anotherProp: number;
        }

        class BasicCalculator extends ToImplement {
            public prop: string;
        }

        it('should be able to reference to itself', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.propThis.propThis.prop).toBe('');
            expect(properties.propThis.propThis.anotherProp).toBe(0);
        });
    });

    describe('for interface properties', () => {
        interface BasicCalculator {
            property: this;
            test: number;
        }
        it('should set the property correctly', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.test).toBe(0);
            expect(properties.property.test).toBe(0);
            expect(properties.property.property.test).toBe(0);
        });
    });

    describe('for interface methods', () => {
        interface BasicCalculator {
            method(): this;
            property: number;
        }

        it('should be able to reference to itself ', () => {
            const properties: BasicCalculator = createMock<BasicCalculator>();
            expect(properties.method().method().property).toBe(0);
        });
    });

    describe('for interface extends', () => {
        interface BasicCalculator {
            method(): this;
            property: number;
        }

        interface UiCalculator extends BasicCalculator {
            myProperty: string;
        }

        it('should be able to reference to itself ', () => {
            const properties: UiCalculator = createMock<UiCalculator>();
            expect(properties.method().method().property).toBe(0);
            expect(properties.method().method().myProperty).toBe('');
        });
    });

    describe('for generic', () => {
        interface BasicCalculator<T> {
            method(): T;
        }

        interface UiCalculator {
            myProperty: BasicCalculator<UiCalculator>;
            test: number;
        }

        it('should be able to reference to itself ', () => {
            const properties: UiCalculator = createMock<UiCalculator>();
            expect(properties.myProperty.method().test).toBe(0);
        });
    });

    describe('for multiple this', () => {
        interface AnotherCalculator {
            getThis: this;
            prop: number;
        }

        interface UiCalculator extends B {
            another: AnotherCalculator;
            this: this;
            prop: string;
            another2: AnotherCalculator;
        }

        interface B {
            aaa: this;
        }

        it('should be able to reference to itself ', () => {
            const properties: UiCalculator = createMock<UiCalculator>();
            expect(properties.this.prop).toBe('');
            expect(properties.aaa.prop).toBe('');
            expect(properties.another.prop).toBe(0);
            expect(properties.another2.getThis.prop).toBe(0);
        });
    });
});
