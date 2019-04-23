import { createMock } from 'ts-auto-mock';

describe('for keyin keyof', () => {
    describe('of interface', () => {
        interface Keys {
            a: number;
        }

        type keyInKeyof = {[key in keyof Keys]: string};

        it('should set all the keys as properties', () => {
            const properties: keyInKeyof = createMock<keyInKeyof>();
            expect(properties.a).toBe('');
        });
    });

    // describe('of class with return type', () => {
    // 	class Test {
    // 		a: number;
    // 	}
    //
    // 	type keyInKeyof = {[key in keyof Test]: Test[key]}
    //
    // 	it('should set all the keys as properties', () => {
    // 		const properties: keyInKeyof = createMock<keyInKeyof>();
    // 		expect(properties.a).toBe(0);
    // 	});
    // });
});
