import { createMock } from 'ts-auto-mock';

describe('typeQuery undefined ', () => {
  it('should return undefined', () => {
    // NOTE: undefined really violates the createMock interface, but we want to
    // make sure if a set of type declarations are faulty (from DefinitelyTyped
    // for example) they will "fail" silently.

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const type: typeof undefined = createMock<typeof undefined>();

    expect(type).toBeUndefined();
  });
});
