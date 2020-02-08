import { createMock } from 'ts-auto-mock';

describe('typeQuery undefined ', () => {
  it('should return undefined', () => {
    const type: typeof undefined = createMock<typeof undefined>();

    expect(type).toBeUndefined();
  });
});
