import { createMock } from 'ts-auto-mock';

describe('generic null', () => {
  it('should assign null value when not provided even if it was supposed to', () => {
    interface A<P> {
      prop: P;
      data: {
        a: string;
      };
    }

    // @ts-ignore
    const mock: A = createMock<A>();

    expect(mock.prop).toBeNull();
    expect(mock.data.a).toBe('');
  });
});
