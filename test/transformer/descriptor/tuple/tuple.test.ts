import { createMock } from 'ts-auto-mock';

describe('for tuple', () => {
  interface InterfaceElement {
    prop: string;
  }

  interface Interface {
    tuple: [string, number, InterfaceElement];
  }

  it('should set an instance of tuple', () => {
    const properties: Interface = createMock<Interface>();
    expect(properties.tuple.length).toBe(3);
    expect(properties.tuple[0]).toEqual('');
    expect(properties.tuple[1]).toEqual(0);
    expect(properties.tuple[2].prop).toEqual('');
  });
});
