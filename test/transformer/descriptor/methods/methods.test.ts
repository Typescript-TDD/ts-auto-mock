import { createMock } from "../../../../src/transformer/create-mock";

describe('for methods', () => {
	interface InterfaceReturnMethod {
		a: string;
	}
	
	interface Interface {
		a(): void;
		b(): number;
		c(): string;
		d(): string[];
		e(): InterfaceReturnMethod;
	}

	it('should set the functions', () => {
		const properties: Interface = createMock<Interface>();
		expect(properties.a()).toBeNull();
		expect(properties.b()).toBe(0);
		expect(properties.c()).toBe("");
		expect(properties.d()).toEqual([]);
		expect(properties.e().a).toBe("");
	});

	describe('for interface declaration', () => {
        interface Interface {
            method: () => number
        }

        it('should set the functions', () => {
            const properties: Interface = createMock<Interface>();
            expect(properties.method()).toBe(0);
        });
	});

	describe('for declaration', () => {
		class MyClass {
			method(): number {
				return 2;
			}
		}

		it('should set the functions', () => {
			const properties: MyClass = createMock<MyClass>();
			expect(properties.method()).toBe(0);
		});
	});

	// describe('for class arrow function', () => {
	//   class MyClass {
	//       public method = () => {
    //         return "s"
    //       }
    //   }
    //
    //     it('should set the function', () => {
    //         const properties: MyClass = createMock<MyClass>();
    //         expect(properties.method()).toBe("");
    //     });
	// });
});