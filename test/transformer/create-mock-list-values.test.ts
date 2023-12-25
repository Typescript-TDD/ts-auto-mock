import { createMockList } from 'ts-auto-mock';

describe('create-mock-list-values', () => {
  interface Interface {
    property: string;
    method(): void;
  }

  it('should create an array of mocks with the values merged with the function provided', () => {
    const properties: Array<Interface> = createMockList<Interface>(
      2,
      (index: number) => ({
        property: `sss${index}`,
      }),
    );

    expect(properties[0].property).toBe('sss0');
    expect(properties[0].method());
    expect(properties[1].property).toBe('sss1');
    expect(properties.length).toBe(2);
  });
});
