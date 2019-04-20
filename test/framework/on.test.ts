import {AutoMockExtensionHandler, createMock, On} from 'ts-auto-mock';

describe('On', () => {
    it('should throw when is used without a mock', () => {
        // tslint:disable
        expect(() => On({ prop: () => {} })).toThrow();
    });

    it('should return an AutoMockExtensionHandler when used with a mock', () => {
        expect(On(createMock<{prop: () => void}>())).toEqual(jasmine.any(AutoMockExtensionHandler));
    });
});
