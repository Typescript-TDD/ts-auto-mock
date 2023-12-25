import { createMockList } from 'ts-auto-mock';

describe('create-mock-list-values', () => {
  interface Interface {
    property: {
      a: number;
      c: () => void;
    };
    method(): void;
  }

  it('should have different mocks for each item with merged values', () => {
    const properties: Interface[] = createMockList<Interface>(
      3,
      (index: number) => ({
        property: {
          a: index * 2,
        },
      }),
    );
    properties[0].method();
    properties[2].method();
    expect(properties.length).toBe(3);
    expect(properties[0].method).toHaveBeenCalled();
    expect(properties[2].method).toHaveBeenCalled();
    expect(properties[1].method).not.toHaveBeenCalled();
    properties[1].method();
    expect(properties[1].method).toHaveBeenCalled();
    expect(properties[0].property.a).toBe(0);
    expect(properties[1].property.a).toBe(2);
    expect(properties[2].property.a).toBe(4);
  });

  it('should create a list of mocks when the count of mocks is not literal', () => {
    function two(): number {
      return 2;
    }

    const mockList: Interface[] = createMockList<Interface>(
      two(),
      (index: number) => ({
        property: {
          a: index * 2,
        },
      }),
    );
    expect(mockList.length).toBe(2);
  });
});
