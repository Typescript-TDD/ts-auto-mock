import { createMock } from "../../../src/transformer/create-mock";
describe('for functions assigned', () => {

    describe('arrow', () => {
        class MyClass {
            public method = () => {
                return "s"
            }
        }

        it('should set the function', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.method()).toBe("");
        });
    });

    describe('expression', () => {
        class MyClass {
            public method = function() {
                return "s"
            }
        }

        it('should set the function', () => {
            const properties: MyClass = createMock<MyClass>();
            expect(properties.method()).toBe("");
        });
    });
});