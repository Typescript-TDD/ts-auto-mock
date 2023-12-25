import { createMock } from 'ts-auto-mock';
import { ExtensionHandler, On } from 'ts-auto-mock/extension';

describe('On', () => {
  it('should throw when is used without a mock', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(() => On({ prop: () => {} })).toThrow();
  });

  it('should return an ExtensionHandler when used with a mock', () => {
    expect(On(createMock<{ prop: () => void }>())).toEqual(
      jasmine.any(ExtensionHandler),
    );
  });
});
